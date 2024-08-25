import { SetMetadata } from "@nestjs/common";
import { $Enums } from "@prisma/client";


export const ROLES_KEY = "roles";

export function RequireRoles(...roles: $Enums.Role[]) {
  return SetMetadata(ROLES_KEY, roles);
}
