import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { StatusResult } from 'src/common/entity/status-result.entity';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @GetUser() user , 
    ) {
    return this.reviewService.create(user , createReviewInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Review], { name: 'findAllReview' })
  findAll() {
    return this.reviewService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => [Review], { name: 'findReviewByTherapist' })
  findReviewByTherapist(@Args('therapistId') therapistId:string) {
    return this.reviewService.findReviewByTherapist(therapistId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Review, { name: 'findOneReview' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.reviewService.findOne({id});
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => StatusResult , {name : 'updateReview'})
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput ,
    @GetUser() user 
    ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput , user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => StatusResult , {name : 'removeReview'})
  removeReview(@Args('id') id : string , @GetUser() user) {
    return this.reviewService.remove(id , user);
  }
}
