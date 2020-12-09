import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { Roles } from './roles.enum';

@Injectable()
export class UserService {
    private logger = new Logger('UserServiceLogger');

    @Client({ transport: Transport.TCP, options: { host:'127.0.0.1', port: 8877}})
    private client: ClientTCP;

    async createUser(createUserDto: CreateUserDto, userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<Object, Object>('createUser', createUserDto);
        } 

        this.logger.log('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }

    async login(loginDto: LoginDto){
        return this.client.send<Object, Object>('login',loginDto);
    }

    async getUser(email: string){
        return this.client.send<string, Object>('getUser',email);
    }

    async updateUser(id: string){
        return this.client.send<string, Object>('updateUser', id);
    }

    async deleteUser(id: string, userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<string, Object>('deleteUser', id);
        }

        this.logger.log('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }

    async getAllUsers(id: string, userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<string, Object>('getAllUsers', id);
        }

        this.logger.log('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }


}
