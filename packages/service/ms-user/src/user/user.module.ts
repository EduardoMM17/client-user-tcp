import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'contraSecreta',
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy, PassportModule]
})
export class UserModule {}
