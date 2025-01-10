import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/users/user.schema';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from 'src/app.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService], 

  })
export class UsersModule {}
