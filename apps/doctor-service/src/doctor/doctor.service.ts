import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async findAll() {
    const doctors = await this.doctorRepo.find({});

    if (doctors.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Doctors not found',
      });
    }

    return { items: doctors };
  }

  async findOneById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepo.findOneBy({ id });

    if (!doctor) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Doctor not found',
      });
    }

    return doctor;
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const existing = await this.doctorRepo.findOneBy({
      email: createDoctorDto.email,
    });

    if (existing) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'A doctor with this email already exists.',
      });
    }

    const newDoctor = this.doctorRepo.create(createDoctorDto);
    return await this.doctorRepo.save(newDoctor);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOneById(id);

    if (updateDoctorDto.email && updateDoctorDto.email !== doctor.email) {
      const existing = await this.doctorRepo.findOneBy({
        email: updateDoctorDto.email,
      });

      if (existing && existing.id !== id) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: 'Email is already in use by another doctor.',
        });
      }
    }

    Object.assign(doctor, updateDoctorDto);
    return this.doctorRepo.save(doctor);
  }

  async remove(id: number): Promise<{ message: string }> {
    const doctor = await this.findOneById(id);

    await this.doctorRepo.remove(doctor);
    return { message: 'Doctor deleted successfully' };
  }
}
