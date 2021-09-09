import React, { FC, HTMLProps } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const ClanCover: FC<HTMLProps<HTMLImageElement>> = ({ src, height = 80 }: HTMLProps<HTMLImageElement>) => {
	return src ? <img src={src} height={height} /> : <FontAwesomeIcon icon={faImage} size="5x" />;
};

export default ClanCover;
