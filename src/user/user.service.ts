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
import { StatusResult } from 'src/common/entity/status-result.entity';


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
      roles , 
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
          roles ,
        }
      })
    } catch (error) {
      throw new BadRequestException(error.message) ;
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

  async changeRole(roles:Role[] , user:User):Promise<StatusResult>{
    await this.findOne({id : user.id}) , 
    await this.prisma.user.update({where : {id : user.id} , data : {roles}})

    return {
      message : 'item edited successfully' , 
      success : true ,
    } 
  }

  async update(id: string , updateUserInput: UpdateUserInput):Promise<StatusResult>{
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

    return {
      message : 'item edited successfully' , 
      success : true ,
    } 
  }

  async remove(id: string):Promise<StatusResult>{
    await this.prisma.user.delete({where :{id}})
    
    return {
      message : 'item removed successfully' , 
      success : true ,
    }
  }
}
