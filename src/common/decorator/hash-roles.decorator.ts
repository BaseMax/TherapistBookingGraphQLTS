import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const ROLLES_KEY = 'roles';
export const HasRoles = (...roles : Role[])=> SetMetadata(ROLLES_KEY , roles);