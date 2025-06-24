import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tweet } from './tweeets.entity'; // Adjust path as needed

@Entity('media')
export class Media {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  tweet_id: string;

  @Column()
  media_type: string;

  @Column()
  media_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relationship
  @ManyToOne(() => Tweet, tweet => tweet.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tweet_id' })
  tweet: Tweet;
}
