// Zuständigkeit: M

import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class GuardEvent {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    timestamp: Date;

    @Column()
    type: string;


}