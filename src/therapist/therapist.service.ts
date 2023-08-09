import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, Specialty, Therapist, User } from '@prisma/client';
import { StatusResult } from 'src/common/entity/status-result.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateTherapistInput } from './dto/create-therapist.input';
import { UpdateTherapistInput } from './dto/update-therapist.input';

@Injectable()
export class TherapistService {
  constructor(
    private readonly prisma:PrismaService , 
    private readonly userService:UserService , 
  ){}

  async getTherapist(userId : string):Promise<Therapist>{
    return await this.prisma.therapist.findFirst({where : {userId}, include : {user : true}})
  }
  
  async create(createTherapistInput: CreateTherapistInput) {
    const therapistExist = await this.prisma.therapist.findFirst({where : {user : {id : createTherapistInput.userId}}});

    if(therapistExist){
      throw new BadRequestException('therapist alredy exist');
    }

    const foundUser = await this.userService.findOne({id : createTherapistInput.userId});
    const genRole:Role[] = foundUser.roles ;
    genRole.push(Role.THERAPIST) ;
    
    // change user role 
    await this.userService.changeRole(genRole , foundUser);

    const therapist = await this.prisma.therapist.create({
      data : {
        ...createTherapistInput , 
        userId : foundUser.id , 
      }
    })

    return therapist ; 
  }

  async findAll():Promise<Therapist[]>{
    return await this.prisma.therapist.findMany({
      include : {
        user : true , 
        reviews : true , 
        appointments : true , 
        specialties : true , 
      }
    })
  }


  async findAllWhere(where:Prisma.TherapistWhereInput):Promise<Therapist[]>{
    return await this.prisma.therapist.findMany({
      where , 
      include : {
        user : true , 
        reviews : true , 
        appointments : true , 
        specialties : true , 
      }
    })
  }

  async findTherapistByLocation(location : string):Promise<Therapist>{
    return await this.findOne({location}) ;
  }

  async findTherapistAvailability():Promise<Therapist[]>{
    return await this.findAllWhere({available : true})
  }

  async findTherapistsBySpecialty(specialty:string):Promise<Specialty[]>{
    return await this.prisma.specialty.findMany({
      where : {
        name : specialty ,
      } ,
      include : {
        therapist : true , 
      }
    })
  }

  async getTherapistCount():Promise<StatusResult>{
    const count = await this.prisma.therapist.count() ;

    return {
      message : `Therapist count : ${count}`,
      success : true 
    }
  }
 

  async findOne(where:Prisma.TherapistWhereInput):Promise<Therapist>{
    const therapist = await this.prisma.therapist.findFirst({where , 
      include : { 
        reviews : {
          select : {
            comment : true , 
            rating : true , 
            user : {
              select : {
                firstName : true , 
                lastName : true,
              }
            }
          }
        }
      }
    })

    if(!therapist){
      throw new NotFoundException('therapist not found');
    }

    return therapist ; 
  }

  async update(userId: string, updateTherapistInput: UpdateTherapistInput):Promise<StatusResult>{
    const therapist = await this.prisma.therapist.findFirst({ where : {user : {id : userId}} })
    const result = await this.prisma.therapist.update({where : {id : therapist.id} , data : {...updateTherapistInput}});

    return {
      message : 'item edited successfully' , 
      success : true ,
    } ; 
  }

  async remove(id : string ):Promise<StatusResult>{
    await this.findOne({id});
    await this.prisma.therapist.delete({where:{id}});
  

    return {
      message : 'item removed successfully' , 
      success : true ,
    }
  }
}
