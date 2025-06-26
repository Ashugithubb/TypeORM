import { Tweet } from 'src/twitter/tweets/entities/tweet.entity';
import { User } from 'src/twitter/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  tweet_id: number;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;


  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tweet, tweet => tweet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tweet_id' })
  tweet: Tweet;
}
