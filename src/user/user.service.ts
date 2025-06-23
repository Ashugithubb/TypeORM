import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private readonly repo:UserRepository){}
    async findOne(id:number){
        return await this.repo.findById(id);
    }
    async findAll(){
        return this.repo.findAll();
     }

     async create(dto:UserDto){
        return this.repo.AddUser(dto)
     }
     async deleteUser(id:number){
        return this.repo.deleteUser(id);
     }
     async updateUser(id:number, dto:Partial<UserDto>){
        return this.repo.updateUser(id,dto)
     }
     async upsert(id:number,dto:Partial<UserDto>){
        return this.repo.upsertUser(id,dto);
     }
}
