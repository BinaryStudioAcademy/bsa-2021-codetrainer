import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
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

	@Column({ type: 'varchar', length: 25, default: '' })
	nickname?: string;

	@Column({ type: 'varchar', length: 500, default: '' })
	avatar?: string;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt!: Date;

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

	@Column({ type: 'varchar', length: 100 })
	password!: string;

	@OneToOne(() => ProfileClan, (profileClan) => profileClan.user, { eager: true, cascade: true })
	@JoinColumn()
	profileClan?: ProfileClan;

	@ManyToOne(() => Clan, (clan) => clan.members)
	clan?: Clan;
}
