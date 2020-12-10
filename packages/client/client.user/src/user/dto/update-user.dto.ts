import { ApiModelProperty } from '@nestjs/swagger';
import { Roles } from '../roles.enum';

export class UpdateUser {
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    telephone: string;
}

export class UpdateUserDto {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    update: UpdateUser
}