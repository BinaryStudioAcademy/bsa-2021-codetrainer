import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from '../user';
import { Task } from '../task';

@Entity()
export class Collection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	name!: string;

	@ManyToOne(() => User, (user) => user)
	author!: User;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Task, (task) => task)
	tasks!: Task[];
}
