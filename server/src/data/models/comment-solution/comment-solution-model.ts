import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract';
import { Solution } from '../solution';
import { User } from '../user';

@Entity()
export class CommentSolution extends AbstractEntity {
	@Column({ type: 'text', default: '' })
	body!: string;

	@ManyToOne(() => User, (user) => user.commentSolutions)
	@JoinColumn()
	user!: User;

	@ManyToOne(() => Solution, (solution) => solution.commentSolutions)
	@JoinColumn()
	solution!: Solution;
}
