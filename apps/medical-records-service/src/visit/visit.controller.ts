import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  readAll() {
    return this.visitService.readAll();
  }

  @Get(':id')
  readOneById(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.readOneById(id);
  }

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitService.create(createVisitDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitService.update(id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.remove(id);
  }
}
