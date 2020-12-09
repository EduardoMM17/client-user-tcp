import { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn, Unique } from 'typeorm';
import { Roles } from './roles.enum';

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Index({ unique: true})
    @Column()
    email: string;

    @Index()
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    telephone: string;

    @Column()
    role: Roles;

    @Index({unique: true})
    @Column()
    token: string;
}