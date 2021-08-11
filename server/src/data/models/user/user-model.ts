import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	ManyToOne,
	JoinColumn,
	OneToMany,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProfileClan } from './profile-clan-model';
import { Clan } from '../clan';
import { Task } from '../task';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	username?: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	name?: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	surname?: string;

	@Column({ type: 'varchar', length: 100, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	password?: string;

	@Column({ type: 'int', default: 0 })
	rank!: number;

	@Column({ type: 'int', default: 0 })
	honour!: number;

	@OneToOne(() => ProfileClan, (profileClan) => profileClan.user, { eager: true, cascade: true })
	@JoinColumn()
	profileClan?: ProfileClan;

	@ManyToOne(() => Clan, (clan) => clan.members, { nullable: true })
	clan?: Clan;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Task, (task) => task.user)
	@JoinColumn()
	tasks!: Task[];

	@Column({ nullable: true })
	profileUrl?: string;

	@Column({ unique: true, nullable: true })
	githubId?: string;
}
