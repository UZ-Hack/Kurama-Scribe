import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsEmail()
  @IsNotEmpty()
  description: string;
}
