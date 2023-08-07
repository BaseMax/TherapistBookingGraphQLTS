import { Injectable } from '@nestjs/common';
import { CreateTherapistInput } from './dto/create-therapist.input';
import { UpdateTherapistInput } from './dto/update-therapist.input';

@Injectable()
export class TherapistService {
  create(createTherapistInput: CreateTherapistInput) {
    return 'This action adds a new therapist';
  }

  findAll() {
    return `This action returns all therapist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} therapist`;
  }

  update(id: number, updateTherapistInput: UpdateTherapistInput) {
    return `This action updates a #${id} therapist`;
  }

  remove(id: number) {
    return `This action removes a #${id} therapist`;
  }
}
