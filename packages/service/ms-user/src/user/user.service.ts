import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}
    
    async createUser(createUserDto){
        const { email, firstName, lastName, telephone, role } = createUserDto;
        let user = this.userRepository.create({
            email,
            firstName,
            lastName,
            telephone,
            role,
        });

        const payload: JwtPayload = { email, firstName, lastName, telephone, role };
        const token = this.jwtService.sign(payload);
        user.token = token;
        await this.userRepository.save(user);

        return {token};
    }

}
