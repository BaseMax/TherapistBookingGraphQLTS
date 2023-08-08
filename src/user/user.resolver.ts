import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { HasRoles } from 'src/common/decorator/hash-roles.decorator';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Query(() => User, { name: 'findOneUser' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne({id});
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Query(()=>[User] , {name : 'findAllUsers'})
  findAll(){
    return this.userService.findAll()
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RoleGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  
}
