import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	OneToOne,
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

	// @ManyToMany(() => User, (user) => user.followings)
	// followings!: User[]; // user
	// // @OneToOne(() => User, (user) => user.followers, )
	// // follower!: User;
	//
	// @ManyToMany(() => User, (user) => user.followers)
	// followers!: User[]; // follower

	@Column()
	user!: string;
	// user!: User;

	@Column()
	follower!: string;
	// follower!: User;
}
