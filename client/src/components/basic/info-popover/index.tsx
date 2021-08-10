import React from 'react';
// import { Popover2 } from '@blueprintjs/popover2';
import { Popover } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FC, PropsWithChildren } from 'react';
import infoIcon from 'assets/icons/info-popover.svg';
import styles from './info-popover.module.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			border: '1px solid #ec4179',
			borderRadius: '7px',
			background: '#f0f3f9',
			color: '#282828',
			fontSize: '12px',
			marginTop: '5px',
			padding: '0.5rem',
			width: '300px',
		},
	}),
);

const InfoPopover: FC<PropsWithChildren<any>> = ({ children }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	return (
		<div>
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
				className={classes.popover}
				classes={{
					paper: classes.paper,
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
			{/* <Popover2
				autoFocus={false}
				enforceFocus={false}
				minimal={false}
				interactionKind="hover"
				popoverClassName={styles.infoPopover}
				placement="bottom"
				content={children}
				modifiers={{
					arrow: { enabled: false },
				}}
			>
				<img className={styles.icon} src={infoIcon} width={15} height={15} alt="info" />
			</Popover2> */}
		</div>
	);
};

export default InfoPopover;
