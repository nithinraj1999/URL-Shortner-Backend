import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
     constructor(@InjectModel(User.name) private userModel: Model<User>) {}
        async createUser(user:User){
            const hashedPassword = await this.hashPassword(user.password);

            const data = {
                name:user.name,
                email:user.email,
                password:hashedPassword
            }
            const newUser = new this.userModel(data);
            return newUser.save();
        }

        private async hashPassword(password: string): Promise<string> {
            const saltRounds = 10;
            return bcrypt.hash(password, saltRounds);
          }
}
