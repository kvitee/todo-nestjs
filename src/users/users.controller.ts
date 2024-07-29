import {
  Body, Controller, Delete, Get, Param, Post, Put
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.usersService.getById(+id);
  }

  @Put("/:id")
  updateUser(@Param("id") id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(+id, userDto);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
