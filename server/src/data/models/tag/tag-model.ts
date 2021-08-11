import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
} from 'typeorm';
import { Task } from '../task';

@Entity()
export class Tag extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 125 })
	name!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToMany(() => Task, (task) => task.tags)
	tasks!: Task[];
}
