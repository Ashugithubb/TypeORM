import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateBlueTickDto } from './dto/create-bluetick.dto';
import { BlueTick } from './entities/bluetick.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BluetickService {
  constructor(
    @InjectRepository(BlueTick)
    private readonly blueTickRepo: Repository<BlueTick>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly dataSource: DataSource,
  ) { }

  //Find all blue tick records (admin use-case)
  findAll(): Promise<BlueTick[]> {
    return this.blueTickRepo.find({ relations: ['user'] });
  }

  // Find one blue tick record
  async findOne(id: number): Promise<BlueTick> {
    const tick = await this.blueTickRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!tick) {
      throw new NotFoundException(`Blue tick #${id} not found`);
    }

    return tick;
  }

  //  Create blue tick entry ONLY if everything (e.g., payment) is OK
  async createWithTransaction(dto: CreateBlueTickDto): Promise<BlueTick> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if user exists
      const user = await queryRunner.manager.findOne(User, {
        where: { id: dto.user_id },
        relations: ['blueTick'],
      });
      if (!user) throw new NotFoundException('User not found');

      // Check if blue tick already requested
      if (user.blueTick) {
        throw new ConflictException('User already has a blue tick request');
      }

      // Simulate payment validation (optional)
      if (!dto.payment_id || dto.payment_id.length < 3) {
        throw new Error('Invalid payment ID');
      }

      // Create new blue tick
      const blueTick = queryRunner.manager.create(BlueTick, {
        user_id: dto.user_id,
        payment_id: dto.payment_id,
      });


      user.isVerified = true;
      await queryRunner.manager.save(User, user);


      const saved = await queryRunner.manager.save(BlueTick, blueTick);
      await queryRunner.commitTransaction();

      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction failed: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
