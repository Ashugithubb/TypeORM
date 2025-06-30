import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
 @UseGuards(JwtAuthGuard)
   @Get('user')
      findAll(@Query() paginationdto: PaginationDTO) {
          return this.usersService.GetUsers(paginationdto);
      }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }


  @Get('join')
  async getUsersWithTweets() {    //Left outer join
    return await this.usersService.getUsersWithTweets()
  }

  @Get('gender')
  async filterUsers(@Query('gender') gender: string) {
    return this.usersService.filterUsers(gender)
  }


  //FILTER
  @Get()
  async filterMaleFemaleOnIsActive(
    @Query('gender') gender: string,
    @Query('active') active: string
  ) {
    const isActive = active === 'true';

    return this.usersService.filterMaleFemaleOnIsActive({
      gender,
      active: isActive,
    });
  }

  @Get('search')
  async searchUsers(@Query('q') q: string) {
    return this.usersService.searchByUsername(q);
  }

  @Get('sorted-by-age')
  async getUsersSortedByAge(
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.usersService.getUsersSortedByAge(order);
  }

}
