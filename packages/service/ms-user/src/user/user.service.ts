import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
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

    async login(loginDto){
        const { email } = loginDto;
        const user = await this.userRepository.findOne({email});
        if(!user){
            throw new NotFoundException(`User with email ${email} was not found`);
        }

        return user; 
    }

    async getUser(id: string){
        const user = await this.userRepository.findOne({_id: new ObjectId(id)});
        if(!user){
            throw new NotFoundException(`User with ID ${id} was not found`);
        }

        return user;
    }

    async updateUser(updateUserDto: any){
        const { id, update } = updateUserDto;
        return await this.userRepository.update({_id: new ObjectId(id)}, update);
    }

    async deleteUser(id: string){
        const user = this.getUser(id);
        return await this.userRepository.delete({_id: new ObjectId(id)});
    }

    async getAllUsers(){
        return await this.userRepository.find();
    }
}
