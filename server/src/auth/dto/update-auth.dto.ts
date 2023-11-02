import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsNotEmpty()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
