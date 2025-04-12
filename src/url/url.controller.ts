import { Controller, Post, Body, Get, Param, NotFoundException,Headers,UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { getLinkPreview } from 'link-preview-js';

@UseGuards(AuthGuard)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService,private readonly jwtService:JwtService) {}

  @Post('shorten-url')
  async shortenUrlUsingNanoId(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.shortenUrlUsingHash(createUrlDto);
  }

  @Get(':shortened')
  async getOriginalUrl(@Param('shortened') shortened: string, @Headers('authorization') authHeader: string,) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new NotFoundException('Token not found');
    }
    const decoded = this.jwtService.verify(token, {
      secret : process.env.JWT_SECRET_KEY
  });
    const userId = decoded.sub
    const originalUrl = await this.urlService.getUrl(shortened,userId);
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    return { originalUrl };
  }


  @Post('url-history')
  async getHistory(@Body() userId:{userId: string}) {
    
    const id = userId.userId
    return this.urlService.getHistory(id);
  }




}
