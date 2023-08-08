import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=>Auth , {name : 'register'})
  register(@Args('registerInput') registerInput:RegisterInput){
    return this.authService.register(registerInput);
  }

  @Mutation(()=>Auth , {name : 'login'})
  login(@Args('loginInput') loginInput:LoginInput){
    return this.authService.login(loginInput) ; 
  }
}
