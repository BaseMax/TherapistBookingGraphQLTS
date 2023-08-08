import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Role } from "@prisma/client";
import { Observable } from "rxjs";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector : Reflector ,
    ){}

    canActivate(context: GqlExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            ctx.getHandler() , 
            ctx.getClass()
        ])

        if(!requiredRoles){
            return true ;
        }

        const { user } = ctx.getContext().req;

        return requiredRoles.some((role)=>user?.roles?.includes(role));
    }
}