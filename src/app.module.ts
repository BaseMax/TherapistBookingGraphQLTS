import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { Module, NotFoundException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLError } from 'graphql';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ReviewModule } from './review/review.module';
import { AppointmentModule } from './appointment/appointment.module';


@Module({
  imports: [
    ConfigModule.forRoot() ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context : ({req}) => ({req}) ,
      driver : ApolloDriver , 
      autoSchemaFile : join(process.cwd() , "src/schema.gql") , 
      playground : false , 
      plugins : [ApolloServerPluginLandingPageGraphQLPlayground()] , 
    }),
    PrismaModule,
    UserModule,
    TherapistModule,
    AuthModule,
    ReviewModule,
    AppointmentModule ,
  ],
})
export class AppModule {}
