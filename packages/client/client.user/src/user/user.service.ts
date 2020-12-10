import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './roles.enum';

@Injectable()
export class UserService {
    private logger = new Logger('UserServiceLogger');

    @Client({ transport: Transport.TCP, options: { host: process.env.TCP_HOST , port: 8877}})
    private client: ClientTCP;

    async createUser(createUserDto: CreateUserDto, userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<Object, Object>('createUser', createUserDto);
        } 
        this.logger.error('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }

    async login(loginDto: LoginDto){
        return this.client.send<Object, Object>('login',loginDto);
    }

    async getUser(id: string, userId: string){
        if(id === userId){
            return this.client.send<string, Object>('getUser',id);
        } 

        this.logger.error('Id does not match the one from token.');
        throw new UnauthorizedException('Id does not match the one from token.');
    }

    async updateUser(updateUserDto: UpdateUserDto, userId: string){
        if(updateUserDto.id === userId){
            return this.client.send<Object, Object>('updateUser', updateUserDto);
        }

        this.logger.error('Id does not match the one from token.');
        throw new UnauthorizedException('Id does not match the one from token.');
    }

    async deleteUser(id: string, userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<string, Object>('deleteUser', id);
        }

        this.logger.error('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }

    async getAllUsers(userRole: Roles){
        if(userRole === Roles.ADMIN){
            return this.client.send<string, Object>('getAllUsers', {});
        }

        this.logger.error('Only admin users can use this method.');
        throw new UnauthorizedException('Only admin users can use this method.');
    }
}
