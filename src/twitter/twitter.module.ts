import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TUser } from './entity/tuser.entity';
import { Media } from './entity/media.entity';
import { Tweet } from './entity/tweeets.entity';
import { TwitterService } from './twitter.service';

@Module({
  imports: [TypeOrmModule.forFeature([TUser,Media,Tweet])],
  providers: [TwitterService],
  controllers: [TwitterController]
})
export class TwitterModule {}
