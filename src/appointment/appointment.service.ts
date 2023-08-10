import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentStatus, Prisma, User } from '@prisma/client';
import { StatusResult } from 'src/common/entity/status-result.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { TherapistService } from 'src/therapist/therapist.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma:PrismaService , 
    private readonly therapistService:TherapistService
  ){}

  async create(
    user : User , 
    createAppointmentInput: CreateAppointmentInput
  ):Promise<StatusResult>{
    const {
      available , 
      startTime , 
      endTime , 
      therapistId ,
    } = createAppointmentInput ; 
    

    let statusResult:StatusResult = {
      message : 'Item created successfully' , 
      success : true ,  
    }

    try {
      await this.therapistService.findOne({id : therapistId});

      const existAppoinment = await this.prisma.appointment.findFirst({where : {therapistId }})
    
      if(existAppoinment){
        throw new BadRequestException('Appoinment alredy exist');
      }


      const result = await this.prisma.appointment.create({
        data : {
          userId : user.id  , 
          available ,
          startTime , 
          endTime ,
          therapistId ,
          status : AppointmentStatus.PENDING , 
        },
      })

      statusResult.id = result.id ; 
    
    } catch (error) {
      return {
        message : error.message , 
        success : false 
      }
    }
    

    return statusResult ;

  }

  async findOne(where:Prisma.AppointmentWhereInput):Promise<Appointment>{
    const appoinment = await this.prisma.appointment.findFirst({
      where , 
      include : {
        therapist : true , 
        user : true , 
      }
    })

    if(!appoinment){
      throw new NotFoundException('Appoinment is not found')
    }

    return appoinment ; 
  }

  async findUserAppointmentAll(user:User):Promise<Appointment[]>{
    return await this.prisma.appointment.findMany({
      where : {
        userId : user.id ,
      } , 
      include : {
        therapist : true ,
      }
    })
  }

  async findUserAppointmentOne(user:User , id: string):Promise<Appointment>{
    return await this.prisma.appointment.findFirst({
      where : {
        userId : user.id
      } , 
      include : {
        therapist : true , 
      }
    })
  }

  async updateUserAppointment(
    id: string, 
    updateAppointmentInput: UpdateAppointmentInput , 
    user:User
  ):Promise<StatusResult>{
    const {
      startTime , 
      endTime , 
      available , 
    } = updateAppointmentInput ;
    
    const therapist = await this.prisma.therapist.findFirst({where :{userId : user.id}});

    if (!therapist) {
      throw new ForbiddenException('You are not allowed to edit this appoinment');
    }


    await this.prisma.appointment.update({where :{id} , data: {
      startTime , 
      endTime , 
      available ,
    }})

    return {
      message :'Item edited successfully' , 
      success : true ,
    }
  }

  async removeUserAppoinment(id:string , user:User):Promise<StatusResult>{
    const appointment = await this.findOne({id});
    await this.prisma.appointment.delete({where:{id}});

    if (appointment.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to removed this appoinment');
    }


    return {
      message : 'Item removed successfully' , 
      success : true , 
    }
  }





  // Access Therapists 


  async findTherapistAppoinmentOne(id : string , user :User):Promise<Appointment>{
    const appointment = await this.prisma.appointment.findFirst({
      where : {
        id ,
        therapist : {
          userId : user.id 
        }
      } , 
      include : {
        user : true ,
        therapist : true ,
      }
    });

    return appointment ;

  }

  async findTherapistAppoinmentAll(user :User):Promise<Appointment[]>{

    const appointments = await this.prisma.appointment.findMany({
      where : {
        therapist : {
          userId : user.id 
        }
      } , 
      include : {
        user : true ,
      }
    })

    return appointments
  }

  async changeTherapistAppoinmentStatus(
    id : string , 
    status:AppointmentStatus , 
    user :User
  ):Promise<StatusResult>{
      
    const therapist = await this.prisma.therapist.findFirst({where :{userId : user.id}});


    if (!therapist) {
      throw new ForbiddenException('You are not allowed to edit this appoinment');
    }

    await this.prisma.appointment.update({
      where : {id} ,
      data : {
        status ,
      }
    })
      

      return {
        message : 'Item edited successfully' , 
        success : true , 
      }
    }
}
