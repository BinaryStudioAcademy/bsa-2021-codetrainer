import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	BaseEntity,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Task } from '../task';
import { User } from '../user';

@Entity()
export class CommentTask extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => Task, (task) => task.id)
	task!: Task;

	@ManyToOne(() => User, (user) => user.id)
	user!: User;

	@Column({ default: '' })
	body!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Column({ default: false })
	isLike!: boolean;
}
