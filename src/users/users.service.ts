import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
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

  async getAll() {
    return await this.prismaService.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      include: {
        roles: true,
      },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({
        message: "User with the given ID does not exist.",
      });
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      include: {
        roles: true,
      },
      where: { email },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.getById(id);

    await this.prismaService.user.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
