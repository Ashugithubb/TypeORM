import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TUser } from './tuser.entity';
import { Media } from './media.entity';

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

  @ManyToOne(() => TUser, user => user.tweets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: TUser;

  // New Relationship
  @OneToMany(() => Media, media => media.tweet)
  media: Media[];
}
