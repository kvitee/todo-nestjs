import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put
} from "@nestjs/common";
import {
  ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse, ApiOperation, ApiParam, ApiTags
} from "@nestjs/swagger";

import { UsersService } from "./users.service";

import { UserEntity } from "./entities/user.entity";

import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@ApiTags("Users")
@ApiBearerAuth()
@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: "Create user",
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: "User has created successfully.",
  })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({
    summary: "Get all users",
  })
  @ApiOkResponse({
    type: [UserEntity],
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
    type: UserEntity,
    description: "Success.",
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist."
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
    description: "User has updated successfully.",
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist."
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
    description: "User has deleted successfully."
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist."
  })
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
