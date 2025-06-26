import { Module } from '@nestjs/common';
import { LikeController } from './likes.controller';
import { LikeService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { LikeRepository } from './repositry/likes.repositry';

@Module({
   imports:[TypeOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService,LikeRepository],
})
export class LikesModule {}
