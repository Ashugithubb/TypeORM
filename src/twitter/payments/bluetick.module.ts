import { Module } from '@nestjs/common';
import { BluetickService } from './bluetick.service';
import { BluetickController } from './bluetick.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlueTick } from './entities/bluetick.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BlueTick,User]),UsersModule ],
  controllers: [BluetickController],
  providers: [BluetickService],
})
export class BluetickModule {}
