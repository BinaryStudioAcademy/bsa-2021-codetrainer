import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
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

	@Column({ type: 'varchar', length: 100, nullable: true })
	password?: string;

	@OneToOne(() => ProfileClan, (profileClan) => profileClan.user, { eager: true, cascade: true })
	@JoinColumn()
	profileClan?: ProfileClan;

	@ManyToOne(() => Clan, (clan) => clan.members, { nullable: true })
	clan?: Clan;

	@Column({ nullable: true })
	profileUrl?: string;

	@Column({ unique: true, nullable: true })
	githubId?: string;
}
