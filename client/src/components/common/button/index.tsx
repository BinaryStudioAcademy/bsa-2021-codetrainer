import React from 'react';
import { Button as BlueprintButton } from '@blueprintjs/core';

import styles from './button.module.scss';

interface Props {
    type?: string;
    text: string;
}

const Button: React.FC<Props> = ({ type, text, ...rest }) => {
    const className = type === 'primary' ?
         `${styles.button} ${styles.primary}` 
         : `${styles.button}`;
    return (
        <BlueprintButton
            className={className}
            text={text}
            {...rest}
        />
    );
};

export default Button;
