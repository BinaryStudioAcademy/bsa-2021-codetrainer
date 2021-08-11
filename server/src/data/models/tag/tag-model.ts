import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract';
import { Task } from '../task';

@Entity()
export class Tag extends AbstractEntity {
	@Column({ type: 'varchar', length: 125 })
	name!: string;

	@ManyToMany(() => Task, (task) => task.tags)
	tasks!: Task[];
}
