import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,private usersService: UsersService,private jwtService: JwtService) {}
        async createUser(user:Pick<User, 'email' | 'name' | 'password'>){
            const createdUser = await this.usersService.createUser(user);
            return createdUser
    }

    async verifyLogin(user: Partial<User>){
        const existingUser = await this.userModel.findOne({ email:user.email}).exec();
    if (!existingUser) {
      return false; 
    }
    const isPasswordValid = await this.validatePassword(user.password, existingUser.password);
    if(isPasswordValid){
        return this.login(existingUser)
    }

}

async login(user: Partial<User>){
    const payload = { username: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),success:true,userData:{ username: user.name,_id: user._id }
    };
}

private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
        secret : process.env.JWT_SECRET_KEY
    });
}

async checkUserExist(email:string){
    const existingUser = await this.userModel.findOne({ email:email})
    if(existingUser){
        return true
    }
    return false
}
}
