import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { Repository } from 'typeorm';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
  ) {}

  async readAll() {
    return this.visitRepo.find({});
  }

  async readOneById(id: number) {
    const visit = await this.visitRepo.findOneBy({ id });

    if (!visit) throw new NotFoundException('Visit Not Found');

    return visit;
  }

  async create(createVisitDto: CreateVisitDto) {
    const newVisit = this.visitRepo.create(createVisitDto);
    return this.visitRepo.save(newVisit);
  }

  async update(id: number, updateVisitDto: UpdateVisitDto) {
    const visit = await this.readOneById(id);

    Object.assign(visit, updateVisitDto);

    return this.visitRepo.save(visit);
  }

  async remove(id: number) {
    const visit = await this.readOneById(id);

    await this.visitRepo.remove(visit);
    return { message: 'Visit deleted successfully' };
  }
}
