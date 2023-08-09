import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [PrismaModule] , 
  providers: [ReviewResolver, ReviewService]
})
export class ReviewModule {}
