import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { TASK_DIFFICULTY_DEFAULT, TASK_STATUS } from '../../../common';
import { AbstractEntity } from '../abstract';
import { Solution } from '../solution';
import { Tag } from '../tag';
import { User } from '../user';

@Entity()
export class Task extends AbstractEntity {
	@Column({ type: 'varchar', length: 250, default: '' })
	name!: string;

	@Column({ type: 'varchar', default: '' })
	discipline?: string;

	@Column({ type: 'int', default: TASK_DIFFICULTY_DEFAULT })
	rank?: number;

	@Column({ type: 'bool', default: false, width: 1 })
	allowContributors?: boolean;

	@Column({ type: 'text', default: '' })
	description?: string;

	@Column({ type: 'text', default: '' })
	completeSolution?: string;

	@Column({ type: 'text', default: '' })
	initialSolution?: string;

	@Column({ type: 'text', default: '' })
	preloader?: string;

	@Column({ type: 'text', default: '' })
	testCases?: string;

	@Column({ type: 'text', default: '' })
	exampleTestCases?: string;

	@Column({ type: 'enum', enum: TASK_STATUS })
	status!: TASK_STATUS;

	@Column({ type: 'boolean', default: false })
	isPublished!: boolean;

	@ManyToOne(() => User, (user) => user.tasks, { onUpdate: 'CASCADE' })
	user!: User;

	@OneToMany(() => Solution, (solution) => solution.task)
	solutions!: Solution[];

	@ManyToMany(() => Tag, (tag) => tag.tasks)
	@JoinTable()
	tags!: Tag[];
}
