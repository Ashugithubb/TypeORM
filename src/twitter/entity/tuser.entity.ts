import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tweet } from './tweeets.entity';
import { Media } from './media.entity';

@Entity('Tusers')
export class TUser {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Tweet, tweet => tweet.user)
  tweets: Tweet[];


}
