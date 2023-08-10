import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Therapist } from 'src/therapist/entities/therapist.entity';
import { User } from 'src/user/entities/user.entity';
import { AppointmentStatus } from '../enum/appointment-status.enum';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id : string ; 

  @Field(()=>Boolean)
  available : boolean ;

  @Field(() => String)
  status : AppointmentStatus;

  @Field(()=>String)
  startTime : Date ;

  @Field(()=>String)
  endTime : Date ;

  userId : string ;

  therapistId : string ; 

  @Field(()=>User)
  user : User ;

  @Field(()=>Therapist)
  therapist : Therapist ;
}
