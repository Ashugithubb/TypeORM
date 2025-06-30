import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { HasingService } from "src/hasing/hasing.service";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource,
    private hash: HasingService
  ) {
    super(User, datasource.createEntityManager());
  }
  async AddUser(dto: CreateUserDto) {
    const newHashPassword = await this.hash.hashPassword(dto.password);
    dto.password = newHashPassword
    return await this.save(dto);
  }

  async findByEmail(email: string) {
  const user = await this.findOneBy({ email });
   const  emailMatched = user.email;
   const password = user.password
  return {emailMatched,password};
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
  async upsertUser(id: string, dto: Partial<CreateUserDto>) {
    // const found : this.findById(id) ;
    const found = true;
    if (found) {
      return this.updateUser(dto.id, dto);
    }
    else {
      return this.AddUser(dto as CreateUserDto)
    }
  }

}