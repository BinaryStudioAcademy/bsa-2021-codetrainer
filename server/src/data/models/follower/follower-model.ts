import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../user';

@Entity()
export class Follower extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => User, (user) => user.followers, { onUpdate: 'CASCADE' })
	@JoinColumn()
	following!: User;

	@ManyToOne(() => User, (user) => user.following, { onUpdate: 'CASCADE' })
	@JoinColumn()
	follower!: User;
}
