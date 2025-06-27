import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositry/users.repositry';
import { PaginationDTO } from './dto/pagination.dto';
import { TweetRepository } from '../tweets/repositry/tweets.repositry';
import { DataSource } from 'typeorm';
import { Tweet } from '../tweets/entities/tweet.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UserRepository,
    private readonly tweetrepo: TweetRepository,
    private readonly dataSource: DataSource,
  ) { }

  async getUsersWithTweets() {
    return await this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tweets', 'tweet')
      .getMany();
  }

  // Filter user by gender
  async filterUsers(gen?: string) {
    const query = this.repo.createQueryBuilder('user');

    if (gen) {
      query.where('user.gender = :gender', { gender: gen });
    }

    return await query.getMany();
  }

  // Filter by country
  async filterBasedOnCountryName(country?: string) {
    const q = this.repo.createQueryBuilder('user');

    if (country) {
      q.where('user.country = :country', { country });
    }

    return await q.getMany();
  }

  // Filter by gender + isActive
  async filterMaleFemaleOnIsActive({
    gender,
    active,
  }: {
    gender?: string;
    active?: boolean;
  }) {
    const query = this.repo.createQueryBuilder('user');

    if (gender && active !== undefined) {
      query.where('user.gender = :gender', { gender })
        .andWhere('user.isActive = :active', { active });
    } else if (gender) {
      query.where('user.gender = :gender', { gender });
    } else if (active !== undefined) {
      query.where('user.isActive = :active', { active });
    }

    return await query.getMany();
  }

  // Searching by username (case-insensitive)
  async searchByUsername(keyword: string) {
    return await this.repo
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', { username: `%${keyword}%` })
      .getMany();
  }

  // Sorting by age
  async getUsersSortedByAge(order: 'ASC' | 'DESC' = 'ASC') {
    return this.repo
      .createQueryBuilder('user')
      .orderBy('user.age', order)
      .getMany();
  }

  // Create user
  async create(createUserDto: CreateUserDto) {
    return this.repo.AddUser(createUserDto);
  }

  // Pagination
  async GetUsers(paginationdto: PaginationDTO) {
    return this.repo.find({
      skip: paginationdto.skip,
      take: paginationdto.limit ?? 10,
    });
  }

  //  Find single user
  async findOne(id: string) {
    return await this.repo.findById(id);
  }

  //  Update user
  update(id: string, updateUserDto: Partial<CreateUserDto>) {
    return this.repo.updateUser(id, updateUserDto);
  }



  //  Soft delete user and their tweets (in transaction)
  async deleteUser(id: string) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['tweets', 'likes', 'comments', 'blueTick']
      })
      if (!user) {
        throw new NotFoundException(`User with id ${id} coest not exist`)
      }
      await queryRunner.manager.softRemove([
        user,
        ...(user.tweets ?? []),
        ...(user.comments ?? []),
        ...(user.likes ?? []),
        ...(user.blueTick ? [user.blueTick] : [])
      ]);

      await queryRunner.commitTransaction();
      return user;
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Could not soft-delete user and their data.', error.message);
    } finally {
      await queryRunner.release();
    }

  }

  //  Upsert user
  async upsert(id: string, dto: Partial<CreateUserDto>) {
    return this.repo.upsertUser(id, dto);
  }
}
