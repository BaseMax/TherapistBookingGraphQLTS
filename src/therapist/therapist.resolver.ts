import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TherapistService } from './therapist.service';
import { Therapist } from './entities/therapist.entity';
import { CreateTherapistInput } from './dto/create-therapist.input';
import { UpdateTherapistInput } from './dto/update-therapist.input';

@Resolver(() => Therapist)
export class TherapistResolver {
  constructor(private readonly therapistService: TherapistService) {}

  @Mutation(() => Therapist)
  createTherapist(@Args('createTherapistInput') createTherapistInput: CreateTherapistInput) {
    return this.therapistService.create(createTherapistInput);
  }

  @Query(() => [Therapist], { name: 'findAllTherapist' })
  findAll() {
    return this.therapistService.findAll();
  }

  @Query(() => Therapist, { name: 'findOneTherapist' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.therapistService.findOne(id);
  }

  @Mutation(() => Therapist)
  updateTherapist(@Args('updateTherapistInput') updateTherapistInput: UpdateTherapistInput) {
    return this.therapistService.update(updateTherapistInput.id, updateTherapistInput);
  }

  @Mutation(() => Therapist)
  removeTherapist(@Args('id', { type: () => Int }) id: number) {
    return this.therapistService.remove(id);
  }
}
