import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { JwtService } from '@nestjs/jwt/dist';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Headers('authorization') authorization: string,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const decoded = await this.jwtService.verifyAsync(authorization);
    const userId = decoded.id;
    return this.noteService.create(userId, createNoteDto);
  }

  @Get()
  async findAll(
    @Headers('authorization') authorization: string,
  ): Promise<Note[]> {
    const decoded = await this.jwtService.verifyAsync(authorization);
    const userId = decoded.id;

    return this.noteService.findAll(userId);
  }

  @Get('favorites')
  async findFavorites(
    @Headers('authorization') authorization: string,
  ): Promise<Note[]> {
    const decoded = await this.jwtService.verifyAsync(authorization);
    const userId = decoded.id;
    return this.noteService.findFavorites(userId);
  }

  @Patch('/favorite/:id')
  async toggleFavorite(@Param('id') id: string): Promise<Note> {
    return this.noteService.toggleFavorite(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch('update/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    try {
      const updatedUser = await this.noteService.update(id, updateNoteDto);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
