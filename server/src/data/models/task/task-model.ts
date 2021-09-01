import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn, CreateDateColumn } from 'typeorm';
import { TASK_DIFFICULTY_DEFAULT, TASK_STATUS } from '../../../common';
import { AbstractEntity } from '../abstract';
import { Solution } from '../solution';
import { Tag } from '../tag';
import { User } from '../user';
import { CommentTask } from '../comment-task';

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
	initialSolution!: string;

	@Column({ type: 'text', default: '' })
	testCases!: string;

	@Column({ type: 'text', default: '' })
	exampleTestCases?: string;

	@Column({ type: 'enum', enum: TASK_STATUS })
	status!: TASK_STATUS;

	@Column({ type: 'boolean', default: false })
	isPublished!: boolean;

	@ManyToOne(() => User, (user) => user.tasks, { onUpdate: 'CASCADE' })
	user!: User;

	@OneToMany(() => CommentTask, (commentTask) => commentTask.task)
	@JoinColumn()
	comments!: CommentTask[];

	@OneToMany(() => Solution, (solution) => solution.task)
	// @JoinColumn()
	solutions!: Solution[];

	@ManyToMany(() => Tag, (tag) => tag.tasks)
	@JoinTable()
	tags!: Tag[];

	@Column({ default: 0 })
	savedToFavorites!: number;

	@Column({ default: 100 })
	positiveFeedback!: number;

	@CreateDateColumn()
	published!: Date;

	@Column({ default: 0 })
	usersTrained!: number;

	@Column({ default: 0 })
	skips!: number;

	@Column({ default: 0 })
	codeSubmissions!: number;

	@Column({ default: 0 })
	timesCompleted!: number;

	@Column({ default: 0 })
	stars!: number;

	@Column({ default: 0 })
	verySatisfied!: number;

	@Column({ default: 0 })
	somewhatSatisfied!: number;

	@Column({ default: 0 })
	notSatisfied!: number;

	@OneToMany(() => User, (user) => user.contributions)
	@JoinColumn()
	contributors!: User[];
}
