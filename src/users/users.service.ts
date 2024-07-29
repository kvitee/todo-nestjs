import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    const createdUser = await this.prismaService.user.create({
      data: dto
    });

    return {
      id: createdUser.id
    };
  }

  async getAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: { id },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: number) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
