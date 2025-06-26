import { Like } from '../entities/like.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(private dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }

  async hasUserLikedTweet(userId: string, tweetId: number): Promise<boolean> {
    const count = await this.count({ where: { user_id: userId, tweet_id: tweetId } });
    return count > 0;
  }

  async addLike(userId: string, tweetId: number): Promise<Like> {
    const like = this.create({ user_id: userId, tweet_id: tweetId });
    return this.save(like);
  }

  async removeLike(userId: string, tweetId: number): Promise<void> {
    await this.delete({ user_id: userId, tweet_id: tweetId });
  }

  async getLikesForTweet(tweetId: number): Promise<Like[]> {
    return this.find({ where: { tweet_id: tweetId }, relations: ['user'] });
  }

  async countLikesForTweet(tweetId: number): Promise<number> {
    return this.count({ where: { tweet_id: tweetId } });
  }
}
