import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaRepository } from './repositry/media.repositry';


@Injectable()
export class MediaService {
  constructor(private readonly mediaRepo: MediaRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaRepo.addMedia(createMediaDto);
  }

  async findAll() {
    return await this.mediaRepo.findAll();
  }

  async findOne(id: string) {
    const media = await this.mediaRepo.findById(id);
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async update(id: string, updateMediaDto: Partial<CreateMediaDto>) {
    return await this.mediaRepo.updateMedia(id, updateMediaDto);
  }

  async remove(id: string) {
    const result = await this.mediaRepo.deleteMedia(id);
    if (result === 'deleted') return result;
    else throw new NotFoundException(`Media with ID ${id} not found`);
  }

  async upsert(id: string, dto: Partial<CreateMediaDto>) {
    return await this.mediaRepo.upsertMedia(id, dto);
  }


   
}
