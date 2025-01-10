import { Controller, Post, Body, Get, Param, NotFoundException,Res,UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  
  @Post('shorten-url')
  async shortenUrlUsingNanoId(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.shortenUrlUsingHash(createUrlDto);
  }

  @Get(':shortened')
  async getOriginalUrl(@Param('shortened') shortened: string) {
    console.log("hhh");
    
    const originalUrl = await this.urlService.getUrl(shortened);
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    console.log("orig",originalUrl);
    
    return { originalUrl };
  }


}
