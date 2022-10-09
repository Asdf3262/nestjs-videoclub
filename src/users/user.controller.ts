import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './create-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('/users')
    createUser(@Body() createUserDto: CreateUserDto) {
        this.userService.createUser(createUserDto);
    }

    @Get('/users')
    getUsers(@Query('id') id: number) {
        return id ? this.userService.findOne(id) : this.userService.getUsers();
    }

    @Get('/users-movies')
    getUsersMovies(@Query('id') id: number) {
        return this.userService.getUsersMovies();
    }

    @Put('/users/:id')
    editUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        this.userService.editUser(id, updateUserDto);
    }

    @Delete("/users/:id")
    deleteUser(@Param('id') id: number) {
        this.userService.remove(id);
    }
}