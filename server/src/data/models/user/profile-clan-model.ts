import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, CreateDateColumn } from 'typeorm';
import { CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS } from '../../../common';
import { User } from './user-model';

@Entity()
export class ProfileClan extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'enum', enum: CLAN_MEMBER_ROLE, default: CLAN_MEMBER_ROLE.MEMBER })
	role!: CLAN_MEMBER_ROLE;

	@Column({ type: 'enum', enum: CLAN_MEMBER_STATUS, default: CLAN_MEMBER_STATUS.APPROVED })
	status!: CLAN_MEMBER_STATUS;

	@OneToOne(() => User, (user) => user.profileClan, { onDelete: 'CASCADE' })
	user!: User;

	@CreateDateColumn()
	joinedAt!: Date;
}
