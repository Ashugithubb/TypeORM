import { DataSource,Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private datasource:DataSource){
        super(User,datasource.createEntityManager());
      }
      async AddUser(dto: CreateUserDto) {
          return await this.save(dto);
        }
      
        async findById(id: string) {
          return await this.findOneBy({ id });
        }
      
        async findAll() {
          return await this.find();
        }
      
        async updateUser(id: string, updateDto: Partial<CreateUserDto>) {
          const result = await super.update(id, updateDto); 
      
          if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
          }
      
          return 'updated';
        }
      
        async deleteUser(id: string) {
          return await super.softDelete(id); 
        }
        async upsertUser(id:string,dto:Partial<CreateUserDto>){
            const found = this.findById(id);
            if(found){
              return this.updateUser(dto.id,dto);
            }
            else{
              return this.AddUser(dto as CreateUserDto)
            }
        }

}