import { User } from 'src/twitter/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
@Entity('payment_table')
@Unique(['user_id']) 
export class BlueTick {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  payment_id: string;

  @OneToOne(() => User, user => user.blueTick)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
