import { Injectable } from '@nestjs/common';
import { CreateBluetickDto } from './dto/create-bluetick.dto';
import { UpdateBluetickDto } from './dto/update-bluetick.dto';

@Injectable()
export class BluetickService {
  create(createBluetickDto: CreateBluetickDto) {
    return 'This action adds a new bluetick';
  }

  findAll() {
    return `This action returns all bluetick`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bluetick`;
  }

  update(id: number, updateBluetickDto: UpdateBluetickDto) {
    return `This action updates a #${id} bluetick`;
  }

  remove(id: number) {
    return `This action removes a #${id} bluetick`;
  }
}
