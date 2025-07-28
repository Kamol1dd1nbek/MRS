import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @GrpcMethod('DoctorService', 'FindAll')
  findAll() {
    return this.doctorService.findAll();
  }

  @GrpcMethod('DoctorService', 'FindOne')
  getOneById(data: { id: number }) {
    return this.doctorService.findOneById(data.id);
  }

  @GrpcMethod('DoctorService', 'CreateDoctor')
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(id);
  }
}
