import React from 'react';
import styles from './info-block.module.scss'
import clsx from 'clsx'

interface IInfoBlockProps {
    color: avaliableColors;
    header:string;
    text:string;
    picture: string;
}
type avaliableColors = 'cornflowerBlue' | 'whiteLilac'

export const InfoBlock = ({color,header,text,picture}: IInfoBlockProps) => {
	return (
        <div className={clsx(styles.infoBlock, styles[color])}>
            {color==='whiteLilac'?<img src={picture} alt="No connection"/>:null}
            <div className={styles.textBlock}>
                <h1>{header}</h1>
                <p>{text}</p>
            </div>
            {color==='cornflowerBlue'?<img src={picture} alt="No connection"/>:null}
        </div>
	);
};
