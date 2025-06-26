import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Tweet } from './tweeets.entity';
import { Media } from './media.entity';

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

  // New Fields
  @Column({ nullable: true })
  gender: string;@Index()

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
}
