import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(
    createAuthDto: CreateAuthDto,
  ): Promise<{ user: User; access_token: string }> {
    const saltOrRounds = 10;
    createAuthDto.password = await hash(createAuthDto.password, saltOrRounds);
    const data = this.authRep.create({ ...createAuthDto });
    const user = await this.authRep.save(data);

    const payload = {
      id: data.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }

  async findOne(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: User; access_token: string }> {
    try {
      const user = await this.authRep.findOne({
        where: { username: loginUserDto.username },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await compare(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new NotFoundException('Invalid password');
      }

      const payload = {
        id: user.id,
      };

      const access_token = await this.jwtService.signAsync(payload);

      return {
        user,
        access_token,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error finding user');
    }
  }

  async getUser(userId: string) {
    return await this.authRep.findOne({ where: { id: userId } });
  }

  async update(userId: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.authRep.findOne({ where: { id: userId } });

    if (user) {
      await this.authRep.update(user.id, { ...updateAuthDto });
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.authRep.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
