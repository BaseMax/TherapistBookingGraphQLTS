import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator(
    (data:string , ctx:ExecutionContext)=>{
        const user = GqlExecutionContext.create(ctx).getContext().req.user ;

        return data ? user && user[data] : user ; 
    }
)