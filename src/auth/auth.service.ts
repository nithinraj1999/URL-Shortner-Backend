import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User> ,private usersService: UsersService,) {}
        async createUser(user:User){
            const createdUser = await this.usersService.createUser(user);
            return createdUser
    }

    async verifyLogin(user: Partial<User>){
        const existingUser = await this.userModel.findOne({ email:user.email}).exec();
    if (!existingUser) {
      return false; 
    }

    const isPasswordValid = await this.validatePassword(user.password, existingUser.password);
    return isPasswordValid;

}

private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
