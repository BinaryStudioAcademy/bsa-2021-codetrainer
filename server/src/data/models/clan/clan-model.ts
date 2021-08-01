import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clan {
	@PrimaryGeneratedColumn('uuid')
	id!: string;
}

// clan?: IClanFields | string;
// skills?: string[];
// devLevel?: string,
// social?: string[],
