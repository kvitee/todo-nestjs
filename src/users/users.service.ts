import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...dto,
        roles: {
          create: {},
        },
      },
      omit: {
        password: true,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getAll() {
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.user.findUnique({
      omit: {
        password: true,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
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
