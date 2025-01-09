import { Controller, Get, Post,Body  } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';


@Controller('users')
export class UsersController {
    @Post()
    async creatUser(@Body() createUserDto: CreateUserDto){

    }
}
