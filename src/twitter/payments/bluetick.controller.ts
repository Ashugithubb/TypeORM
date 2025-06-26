import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BluetickService } from './bluetick.service';
import { CreateBlueTickDto } from './dto/create-bluetick.dto';
import { BlueTick } from './entities/bluetick.entity';

@Controller('payment')
export class BluetickController {
  constructor(private readonly bluetickService: BluetickService) {}

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBlueTickDto): Promise<BlueTick> {
    return this.bluetickService.createWithTransaction(dto);
  }

 
  @Get()
  findAll(): Promise<BlueTick[]> {
    return this.bluetickService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlueTick> {
    return this.bluetickService.findOne(+id);
  }
}
