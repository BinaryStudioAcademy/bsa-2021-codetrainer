import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProfileClan } from './profile-clan-model';
import { Clan } from '../clan';

@Entity()
export class User {
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

	@Column({ type: 'int', default: 0 })
	rank!: number;

	@Column({ type: 'int', default: 0 })
	honour!: number;

	@OneToOne(() => ProfileClan, (profileClan) => profileClan.user, { eager: true, cascade: true })
	@JoinColumn()
	profileClan?: ProfileClan;

	@ManyToOne(() => Clan, (clan) => clan.members)
	clan?: Clan;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
