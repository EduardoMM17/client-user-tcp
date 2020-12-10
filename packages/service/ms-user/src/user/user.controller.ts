import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
export class UserController {
    private logger = new Logger('User-MS');
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ){}

    @MessagePattern('createUser')
    async createUser(createUserDto: any){
        this.logger.log('Create user: ' + JSON.stringify(createUserDto));
        return await this.userService.createUser(createUserDto);
    }

    @MessagePattern('login')
    async login(loginDto: any){
        this.logger.log('Login user: ' + JSON.stringify(loginDto));
        return await this.userService.login(loginDto);
    }

    @MessagePattern('getUser')
    async getUser(id: string){
        this.logger.log('Get user: ' + id);
        return await this.userService.getUser(id);
    }

    @MessagePattern('updateUser')
    async updateUser(updateUserDto: any){
        this.logger.log('Update user: ' + JSON.stringify(updateUserDto));

        return await this.userService.updateUser(updateUserDto);
    }

    @MessagePattern('deleteUser')
    async deleteUser(id: string){
        this.logger.log('Delete user: ' + id);
        return await this.userService.deleteUser(id);
    }

    @MessagePattern('getAllUsers')
    async getAllusers(){
        this.logger.log('Get all users!');
        return await this.userService.getAllUsers();
    }
}
