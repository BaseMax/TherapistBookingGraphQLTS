import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TherapistModule } from 'src/therapist/therapist.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [TherapistModule , PrismaModule],
  providers: [AppointmentResolver, AppointmentService]
})
export class AppointmentModule {}
