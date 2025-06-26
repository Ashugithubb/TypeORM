import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikeService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikeService],
})
export class LikesModule {}
