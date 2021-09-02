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
import { CommentTask } from '../comment-task';
import { Solution } from '../solution';
import { Follower } from '../follower';

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

	@Column({ type: 'varchar', length: 25, default: '' })
	nickname?: string;

	@Column({ type: 'varchar', length: 500, default: '' })
	avatar?: string;

	@Column({ type: 'timestamptz', nullable: true })
	lastVisit?: Date;

	@Column({ type: 'text', array: true, default: [] })
	skills?: string[];

	@Column({ type: 'varchar', length: 50, default: '' })
	devLevel?: string;

	@Column({ type: 'text', array: true, default: [] })
	social?: string[];

	@Column({ type: 'varchar', length: 100, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	password?: string;

	@Column({ type: 'int', default: 0 })
	rank!: number;

	@Column({ type: 'int', default: 0 })
	honor!: number;

	@Column({ type: 'varchar', length: 250, nullable: true })
	resetToken?: string;

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

	@OneToMany(() => Solution, (solution) => solution.user)
	@JoinColumn()
	solutions!: Solution[];

	@Column({ type: 'varchar', length: 100, unique: true, nullable: true })
	githubId?: string;

	@OneToMany(() => CommentTask, (commentTask) => commentTask.user)
	@JoinColumn()
	commentTasks?: CommentTask[];

	@OneToMany(() => Follower, (follower) => follower.following)
	@JoinColumn()
	followers!: Follower[];

	@OneToMany(() => Follower, (follower) => follower.follower)
	@JoinColumn()
	following!: Follower[];

	@ManyToOne(() => Task, (task) => task.contributors)
	@JoinColumn()
	contributions!: Task;
}
