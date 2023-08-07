import { Module } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { TherapistResolver } from './therapist.resolver';

@Module({
  providers: [TherapistResolver, TherapistService]
})
export class TherapistModule {}
