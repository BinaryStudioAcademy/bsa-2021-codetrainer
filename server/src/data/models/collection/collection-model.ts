import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
	ManyToMany,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	JoinTable,
} from 'typeorm';
import { User } from '../user';
import { Task } from '../task';

@Entity()
export class Collection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	name!: string;

	@ManyToOne(() => User, (user) => user)
	author!: User;

	@ManyToMany(() => User)
	@JoinTable()
	followers!: User[];

	@Column({ type: 'varchar', length: 100, nullable: true })
	avatar?: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToMany(() => Task)
	@JoinTable()
	tasks!: Task[];
}
