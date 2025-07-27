import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async findAll() {
    return this.doctorRepo.find({});
  }

  async findOneById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepo.findOneBy({ id });

    if (!doctor) {
      throw new NotFoundException('Doctor Not Found');
    }

    return doctor;
  }

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const existing = await this.doctorRepo.findOneBy({
        email: createDoctorDto.email,
      });

      if (existing) {
        throw new ConflictException('A doctor with this email already exists.');
      }

      const newDoctor = this.doctorRepo.create(createDoctorDto);
      return this.doctorRepo.save(newDoctor);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    try {
      const doctor = await this.findOneById(id);

      if (updateDoctorDto.email && updateDoctorDto.email !== doctor.email) {
        const existing = await this.doctorRepo.findOneBy({
          email: updateDoctorDto.email,
        });

        if (existing && existing.id !== id) {
          throw new ConflictException('Email is already in use');
        }
      }

      Object.assign(doctor, updateDoctorDto);
      return await this.doctorRepo.save(doctor);
    } catch (error) {
      // todo: there is no response to user
      console.log(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const doctor = await this.findOneById(id);

    this.doctorRepo.remove(doctor);
    return { message: 'Doctor deleted successfully' };
  }
}
