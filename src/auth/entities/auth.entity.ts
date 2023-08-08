import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(()=>String)
  access_token : string ;

  @Field(()=>[String])
  roles : string[] ;
}
