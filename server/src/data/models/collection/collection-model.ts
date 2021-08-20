import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Task } from '../task';

@Entity()
export class Collection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	name!: string;

	@Column({ type: 'varchar' })
	author!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Task, (task) => task)
	tasks!: Task[];
}
