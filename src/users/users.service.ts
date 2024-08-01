import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: dto,
      omit: {
        password: true,
      },
    });
  }

  async getAll() {
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.user.findUnique({
      omit: {
        password: true,
      },
      where: { id },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.prismaService.user.update({
      data: dto,
      where: { id },
    })
  }

  async delete(id: number) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
