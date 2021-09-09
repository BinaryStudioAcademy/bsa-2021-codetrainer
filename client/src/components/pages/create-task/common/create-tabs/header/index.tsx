import React, { useState } from 'react';
import clsx from 'clsx';
import { TCreateTabs } from '../types';

import styles from './styles.module.scss';
import { InfoPopover } from 'components/basic';

interface IHeaderProps {
	tabs: TCreateTabs;
	onChange: (tab: number) => void;
}

export const Header: React.FC<IHeaderProps> = ({ tabs, onChange }) => {
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
					className={clsx(styles.tab, i === active && tabs.length !== 1 && styles.tab__active)}
				>
					<span>{header.title}</span>
					{header.icon ? <InfoPopover iconType={'help'}>{header.toolTipTitle}</InfoPopover> : null}
				</span>
			))}
		</div>
	);
};
//header.toolTipTitle
