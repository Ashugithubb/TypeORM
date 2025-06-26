import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MediaRepository } from './repositry/media.repositry';

@Module({
   imports:[TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService,MediaRepository],
})
export class MediaModule {}
