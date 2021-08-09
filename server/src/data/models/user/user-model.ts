import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	ManyToOne,
	JoinColumn,
	OneToMany,
	BaseEntity,
} from 'typeorm';
import { ProfileClan } from './profile-clan-model';
import { Clan } from '../clan';
import { Task } from '../task';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	name?: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	surname?: string;

	@Column({ type: 'varchar', length: 100, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: 100 })
	password!: string;

	@OneToOne(() => ProfileClan, (profileClan) => profileClan.user, { eager: true, cascade: true })
	@JoinColumn()
	profileClan?: ProfileClan;

	@ManyToOne(() => Clan, (clan) => clan.members)
	clan?: Clan;

	@OneToMany(() => Task, (task) => task.user)
	@JoinColumn()
	tasks!: Task[];
}
