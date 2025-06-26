import { Module } from '@nestjs/common';
import { BluetickService } from './bluetick.service';
import { BluetickController } from './bluetick.controller';

@Module({
  controllers: [BluetickController],
  providers: [BluetickService],
})
export class BluetickModule {}
