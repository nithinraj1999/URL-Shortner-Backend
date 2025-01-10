// src/url/url.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url-dto';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Url } from 'src/url/url.schema';
@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async shortenUrlUsingHash(createUrlDto: CreateUrlDto): Promise<any> {
    const hash = crypto.createHash('sha256').update(createUrlDto.originalUrl).digest('hex');
    const shortLink = `http://localhost:5173/${hash.substring(0, 8)}`; 
    console.log(createUrlDto);
    
                const data = {
                  originalUrl:createUrlDto.originalUrl,
                  shortUrl:shortLink,
                  userId:createUrlDto.id
            }
            const newUrl = new this.urlModel(data);
            return newUrl.save();
  }

  async getUrl(shortened: string): Promise<string | null> {
    const url = await this.urlModel.findOne({ shortUrl: `http://localhost:5173/${shortened}` }).exec();
    return url ? url.originalUrl : null; // Return original URL or null if not found
  }
}
