import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from '../dto/create-tweet.dto';

@Injectable()
export class TweetRepository extends Repository<Tweet> {
  constructor(private dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }

  async addTweet(dto: CreateTweetDto) {
    return await this.save(dto);
  }

  async findById(id: number) {
    return await this.findOneBy({ id });
  }

  async findAll() {
    return await this.find();
  }

  async updateTweet(id: number, updateDto: Partial<CreateTweetDto>) {
    const result = await super.update(id, updateDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }

    return 'updated';
  }

  async deleteTweet(id: number) {
    return await super.softDelete(id);
  }

  async upsertTweet(id: number, dto: Partial<CreateTweetDto>) {
    const found = await this.findById(id); 

    if (found) {
      return this.updateTweet(id, dto);
    } else {
      return this.addTweet(dto as CreateTweetDto);
    }
  }
}
