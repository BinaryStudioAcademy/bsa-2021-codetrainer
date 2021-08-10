import React, { useState, PropsWithChildren, MouseEvent } from 'react';
import { Popover as MaterialPopover } from '@material-ui/core';
import infoIcon from 'assets/icons/info-popover.svg';
import styles from './popover.module.scss';

const Popover: React.FC<PropsWithChildren<any>> = ({ children }) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

	const onOpen = (event: MouseEvent<HTMLImageElement>) => {
		setAnchorEl(event.currentTarget);
		setIsActive(true);
	};

	const onClose = () => {
		setIsActive(false);
	};

	return (
		<>
			<div onClick={onOpen} className={styles.popoverButton}>
				<img src={infoIcon} alt="Information" className={styles.popoverIcon} />
			</div>

			<MaterialPopover
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				anchorEl={anchorEl}
				PaperProps={{ className: styles.popover }}
				open={isActive}
				onClose={onClose}
			>
				{children}
			</MaterialPopover>
		</>
	);
};

export default Popover;
