import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { RequireRoles } from "../auth/require-roles.decorator";


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
  @ApiConflictResponse({
    description: "User with such email already exist.",
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
  @ApiForbiddenResponse({
    description: "User does not have required role (ADMIN).",
  })
  @RequireRoles("ADMIN")
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
    example: 41,
  })
  @ApiOkResponse({
    type: UserEntity,
    description: "Success.",
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist.",
  })
  @Get("/:id")
  getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(+id);
  }

  @ApiOperation({
    summary: "Update user",
  })
  @ApiParam({
    name: "id",
    description: "ID of user which you need to update.",
    example: 41,
  })
  @ApiNoContentResponse({
    description: "User has updated successfully.",
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist.",
  })
  @Patch("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto
  ) {
    return this.usersService.update(id, userDto);
  }

  @ApiOperation({
    summary: "Delete user",
  })
  @ApiParam({
    name: "id",
    description: "ID of user which you need to delete.",
    example: 41,
  })
  @ApiNoContentResponse({
    description: "User has deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "User with the given ID does not exist.",
  })
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
