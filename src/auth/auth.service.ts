import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { hash, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma:PrismaService , 
    private readonly userService:UserService , 
    private readonly jwtService:JwtService , 
  ){}

  private async _signToken(payload:JwtPayload):Promise<string>{
    return await this.jwtService.signAsync(payload)
  }

  async register(registerInput:RegisterInput):Promise<Auth>{
    let user:User ; 

    const userExist = await this.prisma.user.findUnique({where : {email : registerInput.email}});

    if(userExist){
      throw new BadRequestException('user alredy exist');
    }

    const hashedPassword = hashSync(registerInput.password , 12)
    
    user = await this.prisma.user.create({
      data : {
        ...registerInput , 
        roles : [Role.USER] ,
        password : hashedPassword ,
      }
    });

    const payload:JwtPayload = {
      sub : user.id , 
      roles : user.roles , 
    }

    return {
      access_token : await this._signToken(payload) , 
      roles : user.roles , 
    }
  }

  async login(loginInput:LoginInput):Promise<Auth>{
    const user = await this.userService.findByLogin(loginInput);

    const payload:JwtPayload = {
      sub : user.id , 
      roles : user.roles , 
    }

    return {
      access_token : await this._signToken(payload),
      roles : user.roles 
    }
  }

  async validateUser({ sub } : JwtPayload){
    const user = await this.userService.findOne({id : sub});

    if(!user){
      throw new UnauthorizedException('Invalid token')
    }

    return user ; 
  }
}
