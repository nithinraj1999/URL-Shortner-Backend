import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { UsersModule } from 'src/users/users.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: "hello",
      signOptions: { expiresIn: '24h' },
    }),

  ],
  providers:[AuthService],
  controllers:[AuthController],
  exports:[AuthService],
})
export class AuthModule {}
