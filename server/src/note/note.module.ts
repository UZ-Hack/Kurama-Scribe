import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
