import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/user')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    @ApiOperation( {title: 'Create user '})
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto, @Req() Req){
        console.log(Req);
        return await this.userService.createUser(createUserDto, 0);
    }
}
