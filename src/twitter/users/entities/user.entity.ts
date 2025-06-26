import { BlueTick } from 'src/twitter/payments/entities/bluetick.entity';
import { Comment } from 'src/twitter/comments/entities/comment.entity';

import { Like } from 'src/twitter/likes/entities/like.entity';
import { Tweet } from 'src/twitter/tweets/entities/tweet.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';


@Entity('Users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Index()
  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ default: true })
  isActive: boolean;


  @Column({ nullable: true })
  gender: string; @Index()

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  language: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Tweet, tweet => tweet.user)
  tweets: Tweet[];
  @Column({ default: false })
  isVerified: boolean
  
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
  @OneToMany(() => Like, like => like.user)
  likes: Like[];
  @OneToOne(() => BlueTick, blueTick => blueTick.user)
  blueTick: BlueTick;

}
