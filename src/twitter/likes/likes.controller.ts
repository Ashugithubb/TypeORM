import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Query,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { LikeService } from './likes.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}


  @Post()
  async likeTweet(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likeService.likeTweet(createLikeDto);
  }

  
  @Delete(':user_id/:tweet_id')
  @HttpCode(204)
  async unlikeTweet(
    @Param('user_id') user_id: string,
    @Param('tweet_id', ParseIntPipe) tweet_id: number,
  ): Promise<void> {
    return this.likeService.unlikeTweet(user_id, tweet_id);
  }

  @Get('tweet/:tweet_id')
  async getTweetLikes(
    @Param('tweet_id', ParseIntPipe) tweet_id: number,
  ): Promise<Like[]> {
    return this.likeService.getTweetLikes(tweet_id);
  }

 
  @Get('count/:tweet_id')
  async getLikeCount(
    @Param('tweet_id', ParseIntPipe) tweet_id: number,
  ): Promise<number> {
    return this.likeService.getLikeCount(tweet_id);
  }


  @Get('has-liked')
  async hasUserLikedTweet(
    @Query('user_id') user_id: string,
    @Query('tweet_id', ParseIntPipe) tweet_id: number,
  ): Promise<{ liked: boolean }> {
    const liked = await this.likeService.hasUserLikedTweet(user_id, tweet_id);
    return { liked };
  }
}
