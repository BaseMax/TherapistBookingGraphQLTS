import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Appointment, Review, Role, Therapist } from '@prisma/client';

@ObjectType()
export class User {
  @Field(()=>ID)
  id : string ;

  @Field(()=>String)
  firstName : string ;  

  @Field(()=>String)
  lastName : string ; 

  @Field(()=>String)
  password : string ;
  
  @Field(()=>String)
  email : string ;

  @Field(()=>[String])
  roles : Role[]; 
  
  @Field(()=>[String])
  therapists : Therapist[]; 
  
  @Field(()=>[String])
  reviews : Review[] ;
  
  @Field(()=>[String])
  appointments : Appointment[] ;
}
