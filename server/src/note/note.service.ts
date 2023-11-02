import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private notesRep: Repository<Note>,
    @InjectRepository(User) private usersRep: Repository<User>,
  ) {}

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const user = await this.usersRep.findOne({ where: { id: userId } });
    const note = this.notesRep.create({ ...createNoteDto, user });
    return await this.notesRep.save(note);
  }

  async findAll(userId: string): Promise<Note[]> {
    const user = await this.usersRep.findOne({ where: { id: userId } });
    return this.notesRep.find({ where: { user } });
  }

  async findFavorites(userId: string): Promise<Note[]> {
    return this.notesRep.find({
      where: { isFavorited: true, user: { id: userId } },
    });
  }

  async toggleFavorite(id: string): Promise<Note> {
    const note = await this.notesRep.findOne({ where: { id } });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.isFavorited = !note.isFavorited;

    return await this.notesRep.save(note);
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(userId: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.notesRep.findOne({ where: { id: userId } });

    if (note) {
      await this.notesRep.update(note.id, { ...updateNoteDto });
    }

    return note;
  }

  async remove(id: string) {
    const noteToRemove = await this.notesRep.findOne({ where: { id } });
    if (noteToRemove) {
      await this.notesRep.remove(noteToRemove);
    } else {
      throw new Error(`Note with ID ${id} not found`);
    }
  }
}
