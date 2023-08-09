import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Appointment, Specialty } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';

@ObjectType()
export class Therapist {
  @Field(()=>ID)
  id : string ; 

  @Field(()=>String)
  firstName : string ; 

  @Field(()=>String)
  location : string ; 

  @Field(()=>Boolean)
  available : boolean ;

  @Field(()=>User)
  user : User ;

  // @Field()
  // specialties : Specialty[]

  @Field(()=>[Review])
  reviews : Review[]

  // @Field()
  // appointments : Appointment[]
}
