import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity'; // Adjust path as needed
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async addComment(dto: CreateCommentDto) {
    return await this.save(dto);
  }

  async findById(id: number) {
    return await this.findOne({
      where: { id },
      relations: ['user', 'tweet'], 
    });
  }

  async findAll() {
    return await this.find({
      order: { created_at: 'DESC' },
      relations: ['user', 'tweet'],
    });
  }

  async updateComment(id: number, updateDto: Partial<CreateCommentDto>) {
    const result = await this.update(id, updateDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return 'updated';
  }

  async deleteComment(id: number) {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return 'deleted';
  }

  async upsertComment(id: number, dto: Partial<CreateCommentDto>) {
    const existing = await this.findById(id);
    if (existing) {
      return await this.updateComment(id, dto);
    } else {
      return await this.addComment(dto as CreateCommentDto);
    }
  }

  async findByTweetId(tweet_id: number) {
    return await this.find({
      where: { tweet_id },
      order: { created_at: 'DESC' },
      relations: ['user'],
    });
  }
}
