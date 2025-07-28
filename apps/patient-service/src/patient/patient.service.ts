import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async findAll() {
    try {
      return this.patientRepo.find({});
    } catch (error) {
      console.error('Error', error);

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOneById(id: number) {
    try {
      const patient = await this.patientRepo.findOneBy({ id });

      if (!patient) throw new NotFoundException('Patient Not Found');

      return patient;
    } catch (error) {
      console.error('Error', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const newPatient = this.patientRepo.create(createPatientDto);

      return await this.patientRepo.save(newPatient);
    } catch (error) {
      console.error('Error', error);

      throw new InternalServerErrorException('Patient could not be saved');
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const patient = await this.findOneById(id);

      Object.assign(patient, updatePatientDto);
      return await this.patientRepo.save(patient);
    } catch (error) {
      console.error('Error', error);

      throw new InternalServerErrorException('Patient could not be updated');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const patient = await this.findOneById(id);

      await this.patientRepo.remove(patient);
      return { message: 'Patient deleted successfully' };
    } catch (error) {
      console.error('Error', error);

      throw new InternalServerErrorException('Patient could not be deleted');
    }
  }
}
