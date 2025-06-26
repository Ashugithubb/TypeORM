import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositry/users.repositry';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository) { }

  async getUsersWithTweets() {
    return await this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tweets', 'tweet')
      .getMany();
  }
  //Filter user based on Gender
  async filterUsers(gen?: string) {
    const query = this.repo.createQueryBuilder('user');

    if (gen) {
      query.where('user.gender = :gender', { gender: gen });
    }

    return await query.getMany();
  }

// filter based country name
  async filterBasedOnCountryName(country?: string) { 
    const q = this.repo.createQueryBuilder('user');

    if (country) {
      q.where('user.country = :country', { country });
    }
    return await q.getMany();
  }

  async filterMaleFemaleOnIsActive({ gender, active }: { gender?: string; active?: boolean; }) {
    const query = this.repo.createQueryBuilder('user');

    if (gender && active !== undefined) {
      query.where('user.gender = :gender', { gender })
        .andWhere('user.isActive = :active', { active });
    } else if (gender) {
      query.where('user.gender = :gender', { gender });
    } else if (active !== undefined) {
      query.where('user.isActive = :active', { active });
    }
    return await query.getMany();
  }


  //searching
  async searchByUsername(keyword: string) {
    return await this.repo
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', { username: `%${keyword}%` }) 
      .getMany();
  }

  //SORTING
  async getUsersSortedByAge(order: 'ASC' | 'DESC' = 'ASC') {
    return this.repo
      .createQueryBuilder('user')
      .orderBy('user.age', order)
      .getMany();
  }


  //CRUD operation
  async create(createUserDto: CreateUserDto) {
    return this.repo.AddUser(createUserDto)
  }

  async GetUsers(paginationdto: PaginationDTO) {
         return this.repo.find({
             skip: paginationdto.skip,
             take: paginationdto.limit ?? 10
         })
     }

  async findOne(id: string) {
    return await this.repo.findById(id);
  }

  update(id: string, updateUserDto: Partial<CreateUserDto>) {
    return this.repo.updateUser(id, updateUserDto)
  }

  async deleteUser(id: string) {
    return this.repo.deleteUser(id);
  }


  async upsert(id: string, dto: Partial<CreateUserDto>) {
    return this.repo.upsertUser(id, dto);
  }


}
