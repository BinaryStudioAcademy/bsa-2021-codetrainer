import React, { useState, useCallback, PropsWithChildren } from 'react';
import { ClickAwayListener, TextField, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { ISearchLabelProps } from './types';
import styles from './search-label.module.scss';

function SearchLabel({ value = '', onChange, children, className }: PropsWithChildren<ISearchLabelProps>) {
	const [isOpened, setOpened] = useState<boolean>(false);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			onChange(value);
		},
		[onChange],
	);

	return (
		<ClickAwayListener onClickAway={() => setOpened(false)}>
			<div
				onClick={(event) => {
					if (!isOpened) {
						event.stopPropagation();
						event.preventDefault();
						setOpened(true);
					}
				}}
			>
				<IconButton disableRipple size="small" className={clsx(styles.searchLabel, className)}>
					<Search />
					{isOpened ? (
						<TextField
							value={value}
							onChange={handleChange}
							type="search"
							autoFocus={true}
							className={styles.field}
						/>
					) : (
						<span className={styles.field}>{children}</span>
					)}
				</IconButton>
			</div>
		</ClickAwayListener>
	);
}

export default SearchLabel;
