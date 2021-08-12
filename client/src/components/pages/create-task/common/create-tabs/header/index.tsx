import React, { useState } from 'react';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';
import { TCreateTabs } from '../types';

import styles from './styles.module.scss';

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
	const timestamp = Date.now();
	return (
		<div className={styles.tabs}>
			{tabs.map(({ header }, i) => (
				<span
					key={i + 1}
					onClick={() => handleChange(i)}
					className={clsx(styles.tab, i === active && tabs.length !== 1 && styles.tab__active)}
				>
					<span>{header.title}</span>
					{header.icon ? (
						<>
							{/* cant debug this component so if you need an icon use font awesome */}
							{/* <Icon
								icon={header.icon.name}
								data-for={`id-for-tooltip-${i}-${timestamp}`}
								className={styles.icon}
								color={header.icon.color || IconTaskPageTab.COLOR}
								data-tip
							/> */}
							<ReactTooltip id={`id-for-tooltip-${i}-${timestamp}`}>{header.toolTipTitle}</ReactTooltip>
						</>
					) : null}
				</span>
			))}
		</div>
	);
};
