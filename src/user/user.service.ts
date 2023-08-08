import { 
  BadRequestException, 
  HttpException, 
  Injectable, 
  InternalServerErrorException, 
  NotFoundException 
} from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { LoginInput } from 'src/auth/dto/login.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma:PrismaService , 
  ){}
  
  async create(createUserInput:CreateUserInput):Promise<User>{
    let {
      firstName , 
      lastName , 
      password ,
      email ,
    } = createUserInput ;
    let user:User ; 
    
    const emailInDb = await this.prisma.user.findUnique({where : {email}})

    if(emailInDb){
      throw new BadRequestException('user alerdy registerd')
    }

    try {
      password = bcrypt.hashSync(password , 12);
      email = email.toLocaleLowerCase();
      
      user = await this.prisma.user.create({
        data : {
          firstName , 
          lastName , 
          email , 
          password , 
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message) ;
    }
    
    return user ; 
  }

  async findAll():Promise<User[]>{
    return await this.prisma.user.findMany() ;
  }

  async findOne(where:Prisma.UserWhereInput):Promise<User>{
    const user =  await this.prisma.user.findFirst({where});
    
    if(!user){
      throw new NotFoundException('user does not exist')
    }
    
    return user ;
  }

  async findByLogin(loginInput:LoginInput):Promise<User>{
    const { 
      email , 
      password ,
    } = loginInput ;
    
    const user = await this.prisma.user.findUnique({where : {email}});

    if(!user){
      throw new BadRequestException('The email is invalid')
    }

    const comparePassword = await bcrypt.compare(password , user.password) ;

    if(!comparePassword){
      throw new BadRequestException('The password is invalid')
    }

    return user ; 
  }

  async update(id: string , updateUserInput: UpdateUserInput):Promise<boolean>{
    const {
      firstName , 
      lastName , 
      password , 
    } = updateUserInput ; 

    try {
      // check use exist
      await this.findOne({id}) ;

      await this.prisma.user.update({
        data :{
          firstName , 
          lastName ,
          password
        } , 
        where : {id}
      })
    } catch (error) {
      throw new HttpException(error.message , error.status); 
    }

    return true ; 
  }

  async remove(id: string):Promise<boolean>{
    await this.prisma.user.delete({where :{id}})
    return true 
  }
}
