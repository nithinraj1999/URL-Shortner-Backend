import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UrlController } from './url/url.controller';
import { UrlService } from './url/url.service';
import { UrlModule } from './url/url.module';
import { UrlSchema } from './url/url.schema';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
    UrlModule,
  ],
  controllers: [AppController, UsersController, AuthController, UrlController],
  providers: [AppService, UsersService, AuthService, UrlService],
})
export class AppModule {}
