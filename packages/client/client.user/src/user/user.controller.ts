import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
    private logger = new Logger('UserControllerLogger');

    constructor(
        private userService: UserService,
    ){}

    @ApiOperation( {title: 'Create user '})
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto, @User() user){
        this.logger.log('/user/create');
        const role = user.role;
        return await this.userService.createUser(createUserDto, role);
    }

    @ApiOperation({title: 'Login' })
    @Post('/login')
    async login(@Body() loginDto: LoginDto){
        this.logger.log('/user/login');
        return await this.userService.login(loginDto);
    }

    @ApiOperation({title: 'Get User'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('/get-user/:id')
    async getUser(@Param('id') id: string, @User() user){
        const userId = user._id.toString();
        this.logger.log(`/user/get-user/${id}`);
        return await this.userService.getUser(id, userId);
    }

    @ApiOperation({title: 'Update User'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Put('/update-user')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @User() user){
        const userId = user._id.toString();
        this.logger.log('/user/update-user' + JSON.stringify(updateUserDto));
        return await this.userService.updateUser(updateUserDto, userId);
    }

    @ApiOperation({title: 'Delete user'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Delete('/delete-user/:id')
    async deleteUser(@Param('id') id: string, @User() user){
        const role = user.role;
        this.logger.log(`/user/delete-user/${id}`);
        return await this.userService.deleteUser(id, role);
    }

    @ApiOperation({ title: 'Get all users'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('/get-all-users')
    async getAllUsers(@User() user){
        const role = user.role;
        this.logger.log('/user/get-all-users');
        return await this.userService.getAllUsers(role);
    }
}
