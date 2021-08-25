import React from 'react';
import clsx from 'clsx';
import styles from './image-block.module.scss';

const ImageBlock: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
	return (
		<div className={clsx(styles.imageBlock, className)}>
			<img src={src} alt={alt} />
		</div>
	);
};

export default ImageBlock;
