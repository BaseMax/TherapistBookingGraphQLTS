import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TherapistService } from './therapist.service';
import { Therapist } from './entities/therapist.entity';
import { CreateTherapistInput } from './dto/create-therapist.input';
import { UpdateTherapistInput } from './dto/update-therapist.input';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/common/decorator/hash-roles.decorator';
import { StatusResult } from 'src/common/entity/status-result.entity';

@Resolver(() => Therapist)
export class TherapistResolver {
  constructor(private readonly therapistService: TherapistService) {}


  @HasRoles(Role.THERAPIST)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Query(() => Therapist, { name: 'getTherapist' })
  getTherapist(@GetUser() user) {
    return this.therapistService.getTherapist(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Therapist], { name: 'findAllTherapist' })
  findAll() {
    return this.therapistService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Therapist, { name: 'findOneTherapist' })
  findOne(@Args('id', { type: () => ID}) id: string) {
    return this.therapistService.findOne({id});
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Therapist], { name: 'findTherapistAvailability' })
  findTherapistAvailability() {
    return this.therapistService.findTherapistAvailability();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Therapist] , { name: 'getTherapistCount' })
  getTherapistCount() {
    return this.therapistService.getTherapistCount();
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => [Therapist] , { name: 'findTherapistsBySpecialty' })
  findTherapistsBySpecialty(@Args('specialty') specialty:string) {
    return this.therapistService.findTherapistsBySpecialty(specialty);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Therapist] , { name: 'findTherapistByLocation' })
  findTherapistByLocation(@Args('location') location:string) {
    return this.therapistService.findTherapistByLocation(location);
  }


  @HasRoles(Role.ADMIN , Role.THERAPIST)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Mutation(() => StatusResult , {name : 'updateTherapist'})
  updateTherapist(
    @Args('updateTherapistInput') updateTherapistInput: UpdateTherapistInput , 
    @GetUser() user ) {
    return this.therapistService.update(user.id, updateTherapistInput);
  }




  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Mutation(() => Therapist)
  createTherapist(
    @Args('createTherapistInput') createTherapistInput: CreateTherapistInput ,
    ) {
    return this.therapistService.create(createTherapistInput);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Mutation(() => StatusResult , {name : 'removeTherapist'})
  removeTherapist(@Args('id') id: string) {
    return this.therapistService.remove(id);
  }
}
