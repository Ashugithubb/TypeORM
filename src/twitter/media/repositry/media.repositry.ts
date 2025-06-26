import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import { CreateMediaDto } from '../dto/create-media.dto';

@Injectable()
export class MediaRepository extends Repository<Media> {
  constructor(private dataSource: DataSource) {
    super(Media, dataSource.createEntityManager());
  }

  async addMedia(dto: CreateMediaDto) {
    return await this.save(dto);
  }

  async findById(id: string) {
    return await this.findOneBy({ id });
  }

  async findAll() {
    return await this.find();
  }

  async updateMedia(id: string, updateDto: Partial<CreateMediaDto>) {
    const result = await this.update(id, updateDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return 'updated';
  }

  async deleteMedia(id: string) {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return 'deleted';
  }

  async upsertMedia(id: string, dto: Partial<CreateMediaDto>) {
    const found = await this.findById(id);
    if (found) {
      return this.updateMedia(id, dto);
    } else {
      return this.addMedia(dto as CreateMediaDto);
    }
  }
}
