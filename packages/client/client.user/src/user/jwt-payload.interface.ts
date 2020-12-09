import { Roles } from './roles.enum';

export interface JwtPayload {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    role: Roles
}