import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'ms-user';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.SECRET,
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtStrategy, PassportModule]
})

export class UserModule {}
