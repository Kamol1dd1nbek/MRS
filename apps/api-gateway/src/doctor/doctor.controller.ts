import { status } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorController implements OnModuleInit {
  private doctorService;

  constructor(@Inject('DOCTOR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.doctorService = this.client.getService('DoctorService');
  }

  @Get()
  async getAllDoctors() {
    try {
      return await lastValueFrom(
        this.doctorService.FindAll({}).pipe(
          catchError((error) => {
            if (error.code === status.NOT_FOUND) {
              throw new NotFoundException('Doctors Not Found');
            }
            console.log(error);
            throw new InternalServerErrorException('Something went wrong');
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getDoctor(@Param('id', ParseIntPipe) id: number) {
    try {
      return await lastValueFrom(
        this.doctorService.FindOne({ id }).pipe(
          catchError((error) => {
            if (error.code === status.NOT_FOUND) {
              throw new NotFoundException('Doctor not found');
            }
            throw new InternalServerErrorException('Unexpected error');
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    try {
      return await lastValueFrom(
        this.doctorService
          .CreateDoctor({
            name: createDoctorDto.name,
            email: createDoctorDto.email,
          })
          .pipe(
            catchError((error) => {
              if (error.code === status.NOT_FOUND) {
                throw new NotFoundException('Doctor not found');
              }
              throw new InternalServerErrorException('Unexpected error');
            }),
          ),
      );
    } catch (error) {
      throw error;
    }
  }
}
