import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from 'src/twitter/users/entities/user.entity';
import { Media } from 'src/twitter/media/entities/media.entity';
import { Comment } from 'src/twitter/comments/entities/comment.entity';
import { Like } from 'src/twitter/likes/entities/like.entity';


@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column('text', { nullable: true })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, user => user.tweets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;


  @OneToMany(() => Media, media => media.tweet)
  media: Media[];

@OneToMany(() => Comment, comment => comment.tweet)
comments: Comment[];

@OneToMany(() => Like, like => like.tweet)
likes: Like[];


}
