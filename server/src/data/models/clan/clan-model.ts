import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clan {
	@PrimaryGeneratedColumn('uuid')
	id!: string;
}
