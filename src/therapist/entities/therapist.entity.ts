import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

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

  @Field(()=>String)
  specialty : string ;

  @Field(()=>[Review])
  reviews : Review[]

  @Field(()=>Appointment)
  appointments : Appointment[]
}
