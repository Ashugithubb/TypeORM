import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { User } from './entity/user.entity';
import { TweetDto } from './dto/tweets.dto';
import { MediaDto } from './dto/media.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Controller('twitter')
export class TwitterController {
    constructor(private readonly twitterService: TwitterService) { }
    @Get('user')
    findAll(@Query() paginationdto: PaginationDTO) {
        return this.twitterService.GetUsers(paginationdto);
    }
    @Post('user')
    AddUsers(@Body() dto: User) {
        return this.twitterService.AddUser(dto);
    }
    @Post('tweet')
    AddTweets(@Body() dto: TweetDto) {
        return this.twitterService.AddTweet(dto);
    }
    @Post('media')
    AddMedia(@Body() dto: MediaDto) {
        return this.twitterService.AddMedia(dto)
    }


    UpdateUsers(id: number, dto: Partial<User>) {
        return this.twitterService.UpdateUser(id, dto);
    }

    @Get('join')
    async getUsersWithTweets() {    //Left outer join
        return await this.twitterService.getUsersWithTweets()
    }

    @Get('gender')
    async filterUsers(@Query('gender') gender: string) {
        return this.twitterService.filterUsers(gender)
    }


    //FILTER
    @Get()
    async filterMaleFemaleOnIsActive(
        @Query('gender') gender: string,
        @Query('active') active: string
    ) {
        const isActive = active === 'true';

        return this.twitterService.filterMaleFemaleOnIsActive({
            gender,
            active: isActive,
        });
    }

    @Get('search')
    async searchUsers(@Query('q') q: string) {
        return this.twitterService.searchByUsername(q);
    }

    @Get('sorted-by-age')
    async getUsersSortedByAge(
        @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    ) {
        return this.twitterService.getUsersSortedByAge(order);
    }
}



