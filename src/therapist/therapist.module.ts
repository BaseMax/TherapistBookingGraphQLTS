import { Module } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { TherapistResolver } from './therapist.resolver';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [UserModule , PrismaModule],
  providers: [TherapistResolver, TherapistService] , 
  exports : [TherapistService]
})
export class TherapistModule {}
