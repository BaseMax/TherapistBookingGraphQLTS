import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';

@Module({
  providers: [AppointmentResolver, AppointmentService]
})
export class AppointmentModule {}
