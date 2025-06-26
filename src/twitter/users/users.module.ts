import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositry/users.repositry';
import { TweetRepository } from '../tweets/repositry/tweets.repositry';

@Module({
   imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,UserRepository,TweetRepository],
  exports:[UserRepository,UsersService]
})
export class UsersModule {}
