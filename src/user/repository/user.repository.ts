import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource:DataSource){
    super(User,datasource.createEntityManager());
  }
  async AddUser(dto: UserDto) {
    return await this.save(dto);
  }

  async findById(id: number) {
    return await this.findOneBy({ id });
  }

  async findAll() {
    return await this.find();
  }

  async updateUser(id: number, updateDto: Partial<UserDto>) {
    const result = await super.update(id, updateDto); 

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return 'updated';
  }

  async deleteUser(id: number) {
    return await super.delete(id); 
  }
  async upsertUser(id:number,dto:Partial<UserDto>){
      const found = this.findById(id);
      if(found){
        return this.updateUser(dto.id,dto);
      }
      else{
        return this.AddUser(dto as UserDto)
      }
  }
 
}
