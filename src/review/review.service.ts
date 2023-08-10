import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Review, Therapist, User } from '@prisma/client';
import { StatusResult } from 'src/common/entity/status-result.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma:PrismaService ,
  ){}

  async create(user:User , createReviewInput: CreateReviewInput):Promise<Review>{
    return await this.prisma.review.create({
      data : {
        userId : user.id , 
        ...createReviewInput ,
      }
    })
  }

  async findAll() {
    return await this.prisma.review.findMany({
      include : {
        user : true , 
        therapist : true ,
      }
    })
  }

  async _findAllWhere(where:Prisma.ReviewWhereInput):Promise<Review[]>{
    return await this.prisma.review.findMany({
      where,
      include : {
        user : true , 
        therapist : true ,
      }
    })
  }

  async findReviewByTherapist(therapistId : string){
    return await this._findAllWhere({
      therapistId 
    })
  }

  async findOne(where:Prisma.ReviewWhereInput):Promise<Review>{
    const review = await this.prisma.review.findFirst({
      where , 
      include : {
        user : true , 
        therapist : true ,
      }
    })

    if(!review){
      throw new NotFoundException('Review not found')
    }

    return review ; 
  }

  async update(id: string, updateReviewInput: UpdateReviewInput , user:User):Promise<StatusResult>{
    const review = await this.findOne({id});

    if (review.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to edit this review');
    }

    await this.prisma.review.update({
      where: { id },
      data: {...updateReviewInput},
    });

    return {
      message : 'Item edited successfully' , 
      success : true , 
    }
  }

  async remove(id: string , user:User):Promise<StatusResult>{
    const review = await this.findOne({id});

    if (review.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to removed this review');
    }

    await this.prisma.review.delete({
      where: { id },
    });

    return {
      message : 'Item removed successfully' , 
      success : true , 
    }
  }
}
