import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
