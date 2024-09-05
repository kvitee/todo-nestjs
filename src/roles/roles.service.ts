import { Injectable } from "@nestjs/common";

import { GiveRoleDto } from "./dto/give-role.dto";
import { TakeRoleDto } from "./dto/take-role.dto";

import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async giveRole(dto: GiveRoleDto) {
    await this.prismaService.userRole.create({
      data: dto,
    })
  }

  async takeRole(dto: TakeRoleDto) {
    await this.prismaService.userRole.delete({
      where: {
        userId_role: dto,
      }
    })
  }
}
