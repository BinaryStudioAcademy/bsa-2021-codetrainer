import React from 'react';
import { Popover } from '@material-ui/core';
import { FC, PropsWithChildren } from 'react';
import infoIcon from 'assets/icons/info-popover.svg';
import styles from './info-popover.module.scss';

const InfoPopover: FC<PropsWithChildren<any>> = ({ children }) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	return (
		<>
			<img
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				className={styles.icon}
				src={infoIcon}
				width={15}
				height={15}
				alt="info"
			/>
			<Popover
				id="mouse-over-popover"
				style={{ pointerEvents: 'none' }}
				classes={{
					paper: styles.paper,
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				{children}
			</Popover>
		</>
	);
};

export default InfoPopover;
