import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './repositry/comment.repositry';


@Injectable()
export class CommentsService {
  constructor(private readonly commentRepo: CommentRepository) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepo.addComment(createCommentDto);
  }

  async findAll() {
    return await this.commentRepo.findAll();
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: Partial<CreateCommentDto>) {
    return await this.commentRepo.updateComment(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepo.deleteComment(id);
  }

  async upsert(id: number, dto: Partial<CreateCommentDto>) {
    return await this.commentRepo.upsertComment(id, dto);
  }

  async findByTweetId(tweet_id: number) {
    return await this.commentRepo.findByTweetId(tweet_id);
  }
}
