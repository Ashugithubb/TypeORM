import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { dot } from 'node:test/reporters';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    create(@Body() dto:UserDto){
        return this.userService.create(dto);
    }
    @Get()
    findAll(){
        return this.userService.findAll()
    }
    @Get(':id')
    findById(@Param('id')id){
    return this.userService.findOne((Number)(id))
    }

    @Put(':id')
    updateUser(@Param('id')id,@Body()dto:Partial<UserDto>){
        return this.userService.updateUser((Number)(id),dto);
    }

    @Delete(':id')
    DeleteUser(@Param('id')id){
        return this.userService.deleteUser(Number(id));
    }
    @Patch(':id')
    UpsertUser(@Param('id')id,@Body()dot:Partial<UserDto>){
        return this.userService.updateUser(Number(id),dot);
    }
}
