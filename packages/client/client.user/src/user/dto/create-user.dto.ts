import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Roles } from '../roles.enum';

export class CreateUserDto {
    @ApiModelProperty()
    @IsString()
    email: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    lastName: string;

    @ApiModelProperty()
    @IsNumber()
    telephone: string;

    @ApiModelProperty()
    @IsNumber()
    role: Roles;
}