import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repositry/comment.repositry';
import { MediaModule } from '../media/media.module';
import { TweetsModule } from '../tweets/tweets.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),MediaModule,TweetsModule],
  controllers: [CommentsController],
  providers: [CommentsService,CommentRepository],
})
export class CommentsModule {}
