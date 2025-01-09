import { Controller, Get, Post,Body  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser
  }

  @Post('/login')
  async login(@Body() UserLogin:Partial<User>) {
    const newUser = await this.userService.verifyLogin(UserLogin);
    return newUser
  }

}
  