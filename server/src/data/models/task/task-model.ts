import { Entity, Column, ManyToOne, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { TASK_DIFFICULTY_DEFAULT, TASK_STATUS } from '../../../common';
import { AbstractEntity } from '../abstract';
import { Solution } from '../solution';
import { Tag } from '../tag';
import { User } from '../user';

@Entity()
export class Task extends AbstractEntity {
	@Column({ type: 'varchar', length: 250, default: '' })
	name!: string;

	@Column({ type: 'int', default: TASK_DIFFICULTY_DEFAULT })
	difficulty?: number;

	@Column({ type: 'text', default: '' })
	description?: string;

	@Column({ type: 'text', default: '' })
	testCase?: string;

	@Column({ type: 'text', default: '' })
	testCaseSample?: string;

	@Column({ type: 'text', default: '' })
	initialSolution?: string;

	@Column({ type: 'text', default: '' })
	completeSolution?: string;

	@Column({ type: 'enum', enum: TASK_STATUS })
	status!: TASK_STATUS;

	@Column({ type: 'boolean', default: false })
	isPublished!: boolean;

	@ManyToOne(() => User, (user) => user.tasks, { onUpdate: 'CASCADE' })
	user!: User;

	@OneToMany(() => Solution, (solution) => solution.task)
	solutions!: Solution[];

	@ManyToMany(() => Tag, (tag) => tag.tasks)
	@JoinColumn()
	tags!: Tag[];
}
