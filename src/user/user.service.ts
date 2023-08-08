import { 
  BadRequestException, 
  HttpException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma:PrismaService , 
  ){}
  
  async create(createUserInput:CreateUserInput):Promise<User>{
    const {
      firstName , 
      lastName , 
      password ,
      email 
    } = createUserInput ;
    let user:User ; 
    
    const emailInDb = await this.prisma.user.findUnique({where : {email}})

    if(emailInDb){
      throw new BadRequestException('user alerdy registerd')
    }


    try {
      user = await this.prisma.user.create({data:{
        firstName , 
        lastName , 
        email ,
        password ,
      }})
    } catch (error) {
      throw new HttpException(error.message , error.status);
    }

    return user ; 
  }

  async findAll():Promise<User[]>{
    return await this.prisma.user.findMany()
  }

  async findOne(where:Prisma.UserWhereInput):Promise<User>{
    const user =  await this.prisma.user.findFirst({where});
    
    if(!user){
      throw new NotFoundException('user does not exist')
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
