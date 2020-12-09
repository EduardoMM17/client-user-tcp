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

}
