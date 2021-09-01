import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '../user';

@Entity()
export class Community extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => User, (user) => user)
	firstUser!: User;

	@ManyToOne(() => User, (user) => user)
	secondUser!: User;
}
