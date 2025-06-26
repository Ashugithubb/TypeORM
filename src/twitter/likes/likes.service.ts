import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async likeTweet(createLikeDto: CreateLikeDto): Promise<Like> {
    const { user_id, tweet_id } = createLikeDto;

    // Check if already liked
    const alreadyLiked = await this.likeRepo.findOne({
      where: { user_id, tweet_id },
    });

    if (alreadyLiked) {
      throw new ConflictException('Tweet already liked by this user');
    }

    const like = this.likeRepo.create({ user_id, tweet_id });
    return this.likeRepo.save(like);
  }

  async unlikeTweet(user_id: string, tweet_id: number): Promise<void> {
    const like = await this.likeRepo.findOne({ where: { user_id, tweet_id } });
    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepo.remove(like);
  }

  async getTweetLikes(tweet_id: number): Promise<Like[]> {
    return this.likeRepo.find({
      where: { tweet_id },
      relations: ['user'],
    });
  }

  async getLikeCount(tweet_id: number): Promise<number> {
    return this.likeRepo.count({ where: { tweet_id } });
  }

  async hasUserLikedTweet(user_id: string, tweet_id: number): Promise<boolean> {
    const like = await this.likeRepo.findOne({ where: { user_id, tweet_id } });
    return !!like;
  }
}
