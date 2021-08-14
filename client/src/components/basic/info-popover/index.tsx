import React from 'react';
import { FC, PropsWithChildren } from 'react';
import { Icon } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import './info-popover.scss';

const InfoPopover: FC<PropsWithChildren<any>> = ({ children, iconType }) => {
	const timestamp = Date.now();
	return (
		<>
			<Icon
				data-for={`id-for-tooltip-1-${timestamp}`}
				className="iconPopover"
				data-tip
				color="primary"
				fontSize="small"
			>
				{iconType}
			</Icon>
			<ReactTooltip id={`id-for-tooltip-1-${timestamp}`}>{children}</ReactTooltip>
		</>
	);
};

export default InfoPopover;
