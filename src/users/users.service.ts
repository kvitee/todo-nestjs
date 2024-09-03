import { Injectable } from "@nestjs/common";

import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.create({
      include: {
        roles: true,
      },
      data: {
        ...dto,
        roles: {
          create: {},
        },
      },
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      include: {
        roles: true,
      },
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      include: {
        roles: true,
      },
      where: { email },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
