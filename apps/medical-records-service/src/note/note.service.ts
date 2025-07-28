import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}

  async readAll() {
    return this.noteRepo.find({});
  }

  async readOneById(id: number) {
    const note = await this.noteRepo.findOneBy({ id });

    if (!note) throw new NotFoundException('Note Not Found');

    return note;
  }

  async create(createNoteDto: CreateNoteDto) {
    const newNote = this.noteRepo.create(createNoteDto);

    return this.noteRepo.save(newNote);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.readOneById(id);

    Object.assign(note, updateNoteDto);
    return this.noteRepo.save(note);
  }

  async remove(id: number) {
    const note = await this.readOneById(id);

    await this.noteRepo.remove(note);
    return { message: 'Note deleted successfully' };
  }
}
