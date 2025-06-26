import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetRepository } from './repositry/tweets.repositry';


@Injectable()
export class TweetsService {
  constructor(private readonly tweetRepo: TweetRepository) {}

  async create(createTweetDto: CreateTweetDto) {
    return await this.tweetRepo.addTweet(createTweetDto);
  }

  async findAll() {
    return await this.tweetRepo.findAll();
  }

  async findOne(id: number) {
    const tweet = await this.tweetRepo.findById(id);
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }
    return tweet;
  }

  async update(id: number, updateTweetDto: Partial<CreateTweetDto>) {
    return await this.tweetRepo.updateTweet(id, updateTweetDto);
  }

  async remove(id: number) {
    const result = await this.tweetRepo.deleteTweet(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }
    return 'deleted';
  }

  async upsert(id: number, dto: Partial<CreateTweetDto>) {
    return await this.tweetRepo.upsertTweet(id, dto);
  }
}
