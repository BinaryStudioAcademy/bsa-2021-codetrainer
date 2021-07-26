import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Example {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name?: string;

	@Column()
	text?: string;
}
