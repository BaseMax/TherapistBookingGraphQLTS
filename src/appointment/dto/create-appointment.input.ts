import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field(()=>String)
  therapistId : string ;
  
  @Field(()=>Boolean)
  available : boolean ;

  @Field(()=>Date)
  startTime : Date ;

  @Field(()=>Date)
  endTime : Date ;
}
