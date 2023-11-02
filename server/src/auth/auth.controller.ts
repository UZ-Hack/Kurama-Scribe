import { Controller, Post, Body, Patch, Headers, Get } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async createAccount(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<{ user: User; access_token: string }> {
    try {
      return await this.authService.create(createAuthDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ user: User; access_token: string }> {
    return await this.authService.findOne(loginUserDto);
  }

  @Get('profile')
  async getUser(
    @Headers('Authorization') authorization: string,
  ): Promise<User> {
    try {
      const decoded = await this.jwtService.verifyAsync(authorization);
      const userId = decoded.id;

      return this.authService.getUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update')
  async updateProfile(
    @Headers('authorization') authorization: string,
    @Body() updateAuthDto: UpdateAuthDto,
  ): Promise<User> {
    try {
      const decoded = await this.jwtService.verifyAsync(authorization);
      const userId = decoded.id;

      const updatedUser = await this.authService.update(userId, updateAuthDto);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
