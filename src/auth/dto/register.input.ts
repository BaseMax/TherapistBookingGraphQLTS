import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
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
  @IsEmail()
  @Field(()=>String)
  email : string ;
}
