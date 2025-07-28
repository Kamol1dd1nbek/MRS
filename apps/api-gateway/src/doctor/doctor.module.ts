import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../../../../proto/doctor.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  controllers: [DoctorController],
  providers: [],
})
export class DoctorModule {}
