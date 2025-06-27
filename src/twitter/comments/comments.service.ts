import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './repositry/comment.repositry';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { MediaRepository } from '../media/repositry/media.repositry';
import { TweetRepository } from '../tweets/repositry/tweets.repositry';


@Injectable()
export class CommentsService {
  constructor(private readonly commentRepo: CommentRepository,
    private readonly tweetRepo: TweetRepository,
    private readonly mediaRepo: MediaRepository
  ) { }

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

  // async findByTweetId(tweet_id: number) {
  //   return await this.commentRepo.findByTweetId(tweet_id);
  // }

  async commentOnTweet(type: 'Tweet' | 'Media', id: number | string, dto: CreateCommentDto) {
  if (type === 'Tweet') {
    const tweet = await this.tweetRepo.findOneBy({ id: Number(id) }); 
    if (!tweet) throw new NotFoundException('Tweet not found');
  } else if (type === 'Media') {
    const media = await this.mediaRepo.findOneBy({ id: String(id) }); 
    if (!media) throw new NotFoundException('Media not found');
  } else {
    throw new BadRequestException('Invalid type');
  }

  const comment = this.commentRepo.create({
    ...dto,
    commentOn: type,
    commentableId: String(id),
  });

  return this.commentRepo.save(comment);
}




}
