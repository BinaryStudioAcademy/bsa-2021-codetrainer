import React from 'react';
import { Content } from './components/content';
import { Element } from './components/element';

export interface ITreeView {
	nodeLabel: JSX.Element | string;
	children: Array<ITreeView | string>;
	defaultCollapsed?: boolean;
	arrowClass?: string;
	childClass?: string;
	nodeLabelClass?: string;
}

export const TreeView: React.FC<ITreeView> = (props) => {
	const { children, nodeLabel, nodeLabelClass, arrowClass, childClass } = props;
	return (
		<Element nodeLabel={nodeLabel} nodeLabelClass={nodeLabelClass} arrowClass={arrowClass} childClass={childClass}>
			{children.map((child, index) => {
				if (typeof child === 'string') {
					return (
						<Content key={index.toString()} childClass={childClass}>
							{child}
						</Content>
					);
				} else {
					return <TreeView key={index.toString()} {...child} />;
				}
			})}
		</Element>
	);
};
