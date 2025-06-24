import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TUser } from './entity/tuser.entity';
import { Tweet } from './entity/tweeets.entity';
import { Media } from './entity/media.entity';
import { TweetDto } from './dto/tweets.dto';
import { MediaDto } from './dto/media.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class TwitterService {
    constructor(@InjectRepository(TUser) private userRepo: Repository<TUser>,
        @InjectRepository(Tweet) private tweetRepo: Repository<Tweet>,
        @InjectRepository(Media) private mediaRepo: Repository<Media>
    ) { }


    //create function
    async AddUser(dto: TUser){
        return await this.userRepo.save(dto);
    }
    async AddTweet(dto: TweetDto){
        return await this.tweetRepo.save(dto);
    }
    async AddMedia(dto: MediaDto){
        return await this.mediaRepo.save(dto);
    }
    //get function
   async GetUsers(paginationdto:PaginationDTO){
        return this.userRepo.find({
            skip:paginationdto.skip,
            take: paginationdto.limit ??10
        })
     }
    async GetTweets(){
        return await this.tweetRepo.find();
    }
    async GetMedia(){
        return await this.mediaRepo.find();
    }

    //update function
    async UpdateUser(id:number,dto:Partial<TUser>){
        return await this.userRepo.update(id,dto);
    }
    async UpdateTweet(id:number,dto:Partial<Tweet>){
        return await this.tweetRepo.update(id,dto);
    } 
    async UpdateMedia(id:number,dto:Partial<Media>){
        return await this.mediaRepo.update(id,dto);
    }


//     async getUsersWithTweets() {     QueryBuilder method
//   return await this.userRepo
//     .createQueryBuilder('user')
//     .leftJoinAndSelect('user.tweets', 'tweet')
//     .getMany();
// }

     async getUsersWithTweets() {
  return await this.userRepo.find({
    relations: ['tweets'],
  });

}

     

}
