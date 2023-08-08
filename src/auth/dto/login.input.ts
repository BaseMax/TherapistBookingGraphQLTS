import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @Field(()=>String)
  password : string ;
  
  @IsNotEmpty()
  @Field(()=>String)
  email : string ;
}
