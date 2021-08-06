import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { TASK_DIFFICULTY_DEFAULT, TASK_STATUS } from '../../../common';
import { User } from '../user';

@Entity()
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 250 })
	name!: string;

	@Column({ type: 'int', default: TASK_DIFFICULTY_DEFAULT })
	difficulty?: number;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@Column({ type: 'text', nullable: true })
	testCase?: string;

	@Column({ type: 'text', nullable: true })
	testCaseSample?: string;

	@Column({ type: 'text', nullable: true })
	initialSolution?: string;

	@Column({ type: 'text', nullable: true })
	completeSolution?: string;

	@Column({ type: 'enum', enum: TASK_STATUS })
	status!: TASK_STATUS;

	@Column({ type: 'boolean', default: false })
	isPublished!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => User, (user) => user.tasks)
	user!: User;
}
