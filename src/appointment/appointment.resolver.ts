import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AppointmentStatus, Role, User } from '@prisma/client';
import { StatusResult } from 'src/common/entity/status-result.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/common/decorator/hash-roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}




  // Access user 

  @UseGuards(JwtAuthGuard)
  @Mutation(() => StatusResult)
  createAppointment(
    @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput , 
    @GetUser() user:User) {
    return this.appointmentService.create(user , createAppointmentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Appointment], { name: 'findUserAppointmentAll' })
  findUserAppointmentAll(
    @GetUser() user:User
  ) {
    return this.appointmentService.findUserAppointmentAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Appointment, { name: 'findUserAppointmentOne' })
  findUserAppointmentOne(
    @Args('id', { type: () => ID }) id: string , 
    @GetUser() user:User , 
  ) {
    return this.appointmentService.findUserAppointmentOne(user , id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Appointment , {name : 'updateUserAppointment'})
  updateUserAppointment(
    @Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput , 
    @GetUser() user:User
    ){ 
    return this.appointmentService.updateUserAppointment(updateAppointmentInput.id, updateAppointmentInput , user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Appointment)
  removeAppointment(
    @Args('id', { type: () => ID }) id: string ,
    @GetUser() user:User
    ) {
    return this.appointmentService.removeUserAppoinment(id , user);
  }




  // Access Therapist 
  
  @HasRoles(Role.THERAPIST)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Query(() => [Appointment] , {name : 'findTherapistAppoinmentAll'})
  findTherapistAppoinmentAll(
    @GetUser() user:User
    ) {
    return this.appointmentService.findTherapistAppoinmentAll(user);
  }


  @HasRoles(Role.THERAPIST)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Query(() => Appointment, {name : 'findTherapistAppoinmentOne'})
  findTherapistAppoinmentOne(
    @Args('id', { type: () => ID }) id: string ,
    @GetUser() user:User
    ) {
    return this.appointmentService.findTherapistAppoinmentOne(id , user);
  }

  @HasRoles(Role.THERAPIST)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Mutation(() => StatusResult, {name : 'changeTherapistAppoinmentStatus'})
  changeTherapistAppoinmentStatus(
    @Args('id', { type: () => ID }) id: string ,
    @Args('status', { type: () => ID }) status: AppointmentStatus ,
    @GetUser() user:User
    ) {
    return this.appointmentService.changeTherapistAppoinmentStatus(id , status , user);
  }
}
