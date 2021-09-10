import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import MemberItem from '../member-item';
import SortLabel from 'components/common/sort-label';
import SearchLabel from 'components/common/search-label';
import { IMembersListProps } from './types';
import { Order } from 'helpers/table-helper';
import { MembersSortStrategy } from 'containers/clans/clan/logic/types';
import styles from './members-list.module.scss';

const MemberList: React.FC<IMembersListProps> = ({
	data,
	sort,
	filter,
	setSort,
	setFilter,
	viewer,
	handleMakeAdmin,
	handleDeleteMember,
}) => {
	return (
		<div className={styles.members}>
			<Table className={styles.membersTable}>
				<TableHead component="thead">
					<TableRow>
						<TableCell component="th">
							<SortLabel
								current={sort}
								strategy={MembersSortStrategy.HONOR}
								defaultOrder={Order.ASC}
								setSortingStrategy={setSort}
								className={styles.centered}
							>
								Position
							</SortLabel>
						</TableCell>
						{viewer.profileClan?.role === 'admin' ? <TableCell component="th">Role</TableCell> : null}
						<TableCell component="th">
							<SortLabel
								current={sort}
								strategy={MembersSortStrategy.NAME}
								defaultOrder={Order.ASC}
								setSortingStrategy={setSort}
								className={styles.name}
							>
								<SearchLabel value={filter?.name} onChange={(name) => setFilter({ name })}>
									User
								</SearchLabel>
							</SortLabel>
						</TableCell>
						<TableCell component="th">
							<SortLabel
								current={sort}
								strategy={MembersSortStrategy.JOINED_AT}
								defaultOrder={Order.DESC}
								setSortingStrategy={setSort}
							>
								Joined at
							</SortLabel>
						</TableCell>
						<TableCell component="th">
							<SortLabel
								current={sort}
								strategy={MembersSortStrategy.HONOR}
								defaultOrder={Order.ASC}
								setSortingStrategy={setSort}
								className={styles.centered}
							>
								Honor
							</SortLabel>
						</TableCell>
						{viewer.profileClan?.role === 'admin' ? <TableCell component="th">Delete</TableCell> : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((member, index) => (
						<MemberItem
							member={member}
							key={index}
							viewer={viewer}
							handleMakeAdmin={handleMakeAdmin}
							handleDeleteMember={handleDeleteMember}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default MemberList;
