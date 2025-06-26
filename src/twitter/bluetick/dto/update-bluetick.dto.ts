import { PartialType } from '@nestjs/mapped-types';
import { CreateBluetickDto } from './create-bluetick.dto';

export class UpdateBluetickDto extends PartialType(CreateBluetickDto) {}
