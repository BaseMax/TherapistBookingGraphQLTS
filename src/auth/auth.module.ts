import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStartegy } from './jwt/jwt.startegy';

@Module({
  imports : [
    ConfigModule ,
    PrismaModule , 
    UserModule , 
    PassportModule.register({
      defaultStrategy : 'jwt' ,
      property : 'user' , 
      session : false , 
    }) ,
    JwtModule.registerAsync({
      imports : [ConfigModule] , 
      inject : [ConfigService] , 
      useFactory : async (configService:ConfigService)=>({
        secret : configService.get<string>('JWT_SECRET_KEY') , 
        signOptions : {
          expiresIn : configService.get<string>('TOKEN_EXPIRATION')
        }
      })
    })
  ] ,
  providers: [AuthResolver, AuthService , JwtStartegy] , 
  exports : [
    PassportModule , 
    JwtModule , 
  ]
})
export class AuthModule {}
