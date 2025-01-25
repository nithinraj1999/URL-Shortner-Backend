import { Controller, Get, Post,Body  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { IUser } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const IsExist = await this.userService.checkUserExist(email);
    if(IsExist){
      return {success:false,msg:"user exists"}
    }
    const newUser = await this.userService.createUser(createUserDto);
    return {success:true,newUser}
  }

  @Post('/login')
  async login(@Body() UserLogin:Partial<IUser>) {
    const newUser = await this.userService.verifyLogin(UserLogin);
    return newUser
  }

  

}
  