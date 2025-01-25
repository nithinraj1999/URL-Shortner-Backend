// src/url/url.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url-dto';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Url } from 'src/url/url.schema';
import { Types } from 'mongoose';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}
  async shortenUrlUsingHash(createUrlDto: CreateUrlDto): Promise<any> {
    const hash = crypto.createHash('sha256').update(createUrlDto.originalUrl).digest('hex');
    const shortLink = `${process.env.FRONTEND_URL}/${hash.substring(0, 8)}`; 
    
                const data = {
                  originalUrl:createUrlDto.originalUrl,
                  shortUrl:shortLink,
                  userId:createUrlDto.id
            }
            const newUrl = new this.urlModel(data);
            return newUrl.save();
  }

  async getUrl(shortened: string,userId:string): Promise<string | null> {
    const url = await this.urlModel.findOne({userId:userId, shortUrl: `${process.env.FRONTEND_URL}/${shortened}`}).exec();
    return url ? url.originalUrl : null; 
  }

  async getHistory(userId:string):Promise<any>{
    const history = await this.urlModel.find({userId:userId},{_id:0,originalUrl:1,shortUrl:1}).sort({_id:-1})
    return history
  }
}
