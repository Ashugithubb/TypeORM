import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BluetickService } from './bluetick.service';
import { CreateBluetickDto } from './dto/create-bluetick.dto';
import { UpdateBluetickDto } from './dto/update-bluetick.dto';

@Controller('bluetick')
export class BluetickController {
  constructor(private readonly bluetickService: BluetickService) {}

  @Post()
  create(@Body() createBluetickDto: CreateBluetickDto) {
    return this.bluetickService.create(createBluetickDto);
  }

  @Get()
  findAll() {
    return this.bluetickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bluetickService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBluetickDto: UpdateBluetickDto) {
    return this.bluetickService.update(+id, updateBluetickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bluetickService.remove(+id);
  }
}
