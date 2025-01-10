import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlService } from './url.service';
import { UrlController } from './url.controller'; 
import { Url,UrlSchema } from './url.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]), 
  ],
  providers: [UrlService], 
  controllers: [UrlController],
})
export class UrlModule {}
