import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract';
import { Task } from '../task';
import { User } from '../user';
import { SOLUTION_STATUS } from '../../../common';

@Entity()
export class Solution extends AbstractEntity {
	@Column({ type: 'enum', enum: SOLUTION_STATUS, default: SOLUTION_STATUS.NOT_COMPLETED })
	status!: SOLUTION_STATUS;

	@Column({ type: 'text', default: '' })
	code!: string;

	@Column({ type: 'text', default: '' })
	testCases!: string;

	@ManyToOne(() => User, (user) => user.tasks, { onUpdate: 'CASCADE' })
	user!: User;

	@ManyToOne(() => Task, (task) => task.solutions)
	task!: Task;
}
