import React from 'react';
import clsx from 'clsx';

interface IContent {
	childClass?: string;
}

export const Content: React.FC<IContent> = ({ childClass, children }) => {
	return <div className={clsx({ [childClass || '']: Boolean(childClass) })}>{children}</div>;
};
