import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string

    @Column({ default: 50 })
    age: number;

    @Column({ default: "password" })
    password: string;
    @BeforeInsert()
    // async setPassword(password: string) {
    //     const salt = await bcrypt.genSalt()
    //     this.password = await bcrypt.hash(password || this.password, salt)
    // }
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }

}