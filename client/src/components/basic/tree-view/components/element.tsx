import React, { useState } from 'react';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import styles from './element.module.scss';

interface ITreeView {
	nodeLabel: JSX.Element | string;
	defaultCollapsed?: boolean;
	arrowClass?: string;
	childClass?: string;
	nodeLabelClass?: string;
}

export const Element: React.FC<ITreeView> = (props) => {
	const { children, defaultCollapsed, nodeLabel, arrowClass, nodeLabelClass } = props;
	const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed || false);
	const arrow = (
		<span
			className={clsx(styles.tree_view_arrow, { [arrowClass || '']: Boolean(arrowClass) })}
			onClick={() => setCollapsed((state) => !state)}
		>
			{collapsed ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
		</span>
	);
	return (
		<div className={styles.tree_view}>
			<div className={styles.tree_view_header}>
				{arrow}
				<span className={clsx({ [nodeLabelClass || '']: Boolean(nodeLabelClass) })}>{nodeLabel}</span>
			</div>
			<div className={clsx(styles.tree_view_content)}>{collapsed ? null : children}</div>
		</div>
	);
};
