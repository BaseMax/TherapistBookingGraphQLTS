import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot() ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context : ({req}) => ({req}) ,
      driver : ApolloDriver , 
      autoSchemaFile : join(process.cwd() , "src/schema.gql") , 
      playground : false , 
      plugins : [ApolloServerPluginLandingPageGraphQLPlayground()]
    }),
    PrismaModule,
    UserModule,
    TherapistModule ,
  ],
  providers: [],
})
export class AppModule {}
