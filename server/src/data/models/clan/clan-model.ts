import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { User } from '../user';

@Entity()
export class Clan extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	name!: string;

	@Column({ type: 'boolean', default: true })
	isPublic!: boolean;

	@Column({ type: 'int' })
	maxMembers!: number;

	@Column({ type: 'int' })
	numberOfMembers!: number;

	@OneToMany(() => User, (user) => user.clan)
	members!: User[];
}
