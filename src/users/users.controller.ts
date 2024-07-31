import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put
} from "@nestjs/common";
import {
  ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation,
  ApiParam, ApiTags
} from "@nestjs/swagger";

import { UsersService } from "./users.service";

import { PublicUserDto } from "./dto/public.user.dto";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@ApiTags("Users")
@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: "Create user",
  })
  @ApiCreatedResponse({
    type: PublicUserDto,
    description: "User was created successfully.",
  })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({
    summary: "Get all users",
  })
  @ApiOkResponse({
    type: [PublicUserDto],
    description: "Success.",
  })
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @ApiOperation({
    summary: "Get user",
  })
  @ApiParam({
    name: "id",
    description: "ID of user which you need to get.",
    example: "1",
    schema: {
      type: "number",
    },
  })
  @ApiOkResponse({
    type: PublicUserDto,
    description: "Success.",
  })
  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.usersService.getById(+id);
  }

  @ApiOperation({
    summary: "Update user",
  })
  @ApiParam({
    name: "id",
    description: "ID of user which you need to update.",
    example: "1",
    schema: {
      type: "number",
    },
  })
  @ApiNoContentResponse({
    description: "User was updated successfully.",
  })
  @Put("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  updateUser(@Param("id") id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(+id, userDto);
  }

  @ApiOperation({
    summary: "Delete user",
  })
  @ApiParam({
    name: "id",
    description: "ID of user which you need to delete.",
    example: "1",
    schema: {
      type: "number",
    },
  })
  @ApiNoContentResponse({
    description: "User was deleted successfully."
  })
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
