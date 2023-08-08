import { InputType, Int, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(()=>String)
  firstName : string ;  

  @IsNotEmpty()
  @Field(()=>String)
  lastName : string ; 
  
  @IsNotEmpty()
  @Field(()=>String)
  password : string ;
  
  @IsNotEmpty()
  @Field(()=>String)
  email : string ;

  @IsNotEmpty()
  @Field(()=>[String])
  roles : Role[] ;
}
