import React from 'react';
import { Rank } from 'components';
import { IMemberItemProps } from './types';
import { getFullDate } from 'helpers/date.helper';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { Avatar, Button, InfoPopover } from 'components/basic';
import { TableCell, TableRow } from '@material-ui/core';
import styles from './member-item.module.scss';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import ClearIcon from '@material-ui/icons/Clear';

const MemberItem: React.FC<IMemberItemProps> = ({ member, viewer, handleMakeAdmin, handleDeleteMember }) => {
	return (
		<TableRow className={styles.memberItem}>
			<TableCell className={styles.position}>{member.position}</TableCell>
			{viewer.profileClan?.role === 'admin' ? (
				member.profileClan?.role === 'admin' ? (
					<TableCell className={styles.position}>Admin</TableCell>
				) : (
					<TableCell className={styles.position}>
						<label>
							<Button className={clsx(ButtonClasses.red)} onClick={() => handleMakeAdmin(member.id)}>
								&#128081;
							</Button>
							<InfoPopover iconType="help">You can make a member of a clan an admin.</InfoPopover>
						</label>
					</TableCell>
				)
			) : null}
			<TableCell>
				<Link to={`${ROUTES.Users}/${member.username}`} className={styles.user}>
					<Avatar avatar={member.avatar} size={50} />
					{member.name} {member.surname}
					<Rank rank={member.rank} />
				</Link>
			</TableCell>
			<TableCell className={styles.join}>{getFullDate(new Date(member.profileClan.joinedAt))}</TableCell>
			<TableCell className={styles.honor}>{member.honor}</TableCell>
			{viewer.profileClan?.role === 'admin' ? (
				viewer.id === member.id ? (
					<TableCell className={styles.position}></TableCell>
				) : (
					<TableCell className={styles.position}>
						<div onClick={() => handleDeleteMember(member.id)}>
							<ClearIcon />
						</div>
					</TableCell>
				)
			) : null}
		</TableRow>
	);
};

export default MemberItem;
