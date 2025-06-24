import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TUser } from './entity/tuser.entity';
import { TweetDto } from './dto/tweets.dto';
import { MediaDto } from './dto/media.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Controller('twitter')
export class TwitterController {
    constructor(private readonly twitterService: TwitterService) {}
    @Get('user')
    findAll(@Query() paginationdto:PaginationDTO){
        return this.twitterService.GetUsers(paginationdto);
    }
    @Post('user')
    AddUsers(@Body() dto:TUser){
        return this.twitterService.AddUser(dto);
    }
    @Post('tweet')
     AddTweets(@Body()dto:TweetDto){
        return this.twitterService.AddTweet(dto);
    }
    @Post('media')
    AddMedia(@Body() dto:MediaDto){
        return this.twitterService.AddMedia(dto)
    }

    
    UpdateUsers(id:number,dto:Partial<TUser>){
        return this.twitterService.UpdateUser(id,dto);
    }

    @Get('join')
    getUsersWithTweets(){    //Left outer join
        return this.twitterService.getUsersWithTweets()
    }
   
 // Hum or controller add kar sakte hai agar required hoga
}




    