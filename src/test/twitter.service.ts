import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Tweet } from './entity/tweeets.entity';
import { Media } from './entity/media.entity';
import { TweetDto } from './dto/tweets.dto';
import { MediaDto } from './dto/media.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { T } from '@faker-js/faker/dist/airline-BUL6NtOJ';

@Injectable()
export class TwitterService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Tweet) private tweetRepo: Repository<Tweet>,
        @InjectRepository(Media) private mediaRepo: Repository<Media>
    ) { }


    //create function
    async AddUser(dto: User) {
        return await this.userRepo.save(dto);
    }
    async AddTweet(dto: TweetDto) {
        return await this.tweetRepo.save(dto);
    }
    async AddMedia(dto: MediaDto) {
        return await this.mediaRepo.save(dto);
    }
    //get function
    async GetUsers(paginationdto: PaginationDTO) {
        return this.userRepo.find({
            skip: paginationdto.skip,
            take: paginationdto.limit ?? 10
        })
    }
    async GetTweets() {
        return await this.tweetRepo.find();
    }
    async GetMedia() {
        return await this.mediaRepo.find();
    }


    //update function
    async UpdateUser(id: number, dto: Partial<User>) {


        return await this.userRepo.update(id, dto);
    }
    async UpdateTweet(id: number, dto: Partial<Tweet>) {
        return await this.tweetRepo.update(id, dto);
    }
    async UpdateMedia(id: number, dto: Partial<Media>) {

        return await this.mediaRepo.update(id, dto);
    }


    async getUsersWithTweets() {
        return await this.userRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.tweets', 'tweet')
            .getMany();
    }

    //      async getUsersWithTweets() {
    //   return await this.userRepo.find({
    //     relations: ['tweets'],
    //   });


    // async filterUsers(gen?:string) {
    //     return await this.userRepo.find({
    //         where: {
    //             gender: gen,
    //         },
    //     });
    // }
    //Filter user based on Gender
    async filterUsers(gen?: string) {
        const query = this.userRepo.createQueryBuilder('user');

        if (gen) {
            query.where('user.gender = :gender', { gender: gen });
        }

        return await query.getMany();
    }

    async filterBasedOnCountryName(country?: string) { // filter based country name
        const q = this.userRepo.createQueryBuilder('user');

        if (country) {
            q.where('user.country = :country', { country });
        }
        return await q.getMany();
    }

    async filterMaleFemaleOnIsActive({ gender,active }: {gender?: string;active?: boolean;}) {
        const query = this.userRepo.createQueryBuilder('user');

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
  return await this.userRepo
    .createQueryBuilder('user')
    .where('user.username ILIKE :username', { username: `%${keyword}%` }) // ILIKE for case-insensitive match
    .getMany();
}


//SORTING
async getUsersSortedByAge(order: 'ASC' | 'DESC' = 'ASC') {
  return this.userRepo
    .createQueryBuilder('user')
    .orderBy('user.age', order)
    .getMany();
}


}



