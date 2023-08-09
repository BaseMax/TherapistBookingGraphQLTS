import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Therapist } from 'src/therapist/entities/therapist.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Review {
  @Field(()=>String)
  id : string ; 

  @Field(()=>String)
  therapistId : string ;

  @Field(()=>String)
  userId : string ; 
  
  @Field(()=>Int)
  rating : number ; 

  @Field(()=>String)
  comment : string ; 

  @Field(()=>User)
  user : User ; 

  @Field(()=>Therapist)
  therapist : Therapist ;
}
