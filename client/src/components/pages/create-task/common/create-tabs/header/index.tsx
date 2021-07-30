import React, { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import ReactTooltip from 'react-tooltip';
import { IconTaskPageTab } from 'common';
import { TCreateTabs } from '../types';

import styles from './styles.module.scss';

interface IProps {
	tabs: TCreateTabs;
	onChange: (tab: number) => void;
}

export const Header: React.FC<IProps> = ({ tabs, onChange }) => {
	const [active, setActive] = useState<number>(0);
	const handleChange = (index: number) => {
		onChange(index);
		setActive(index);
	};
	return (
		<div className={styles.tabs}>
			{tabs.map(({ header }, i) => (
				<span
					key={i + 1}
					onClick={() => handleChange(i)}
					className={`${styles['tab']} ${i === active && tabs.length !== 1 ? styles['tab__active'] : ''}`}
				>
					<span>{header.title}</span>
					{header.icon ? (
						<>
							<Icon
								icon={header.icon.name}
								data-for={`id-for-tooltip-${i}`}
								className={styles.icon}
								color={header.icon.color || IconTaskPageTab.COLOR}
								data-tip
							/>
							<ReactTooltip id={`id-for-tooltip-${i}`}>{header.toolTipTitle}</ReactTooltip>
						</>
					) : null}
				</span>
			))}
		</div>
	);
};
