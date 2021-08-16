import React, { FC } from 'react';
import { Switch as MaterialSwitch, SwitchProps } from '@material-ui/core';
import styles from './switch.module.scss';

const Switch: FC<SwitchProps> = (props) => <MaterialSwitch {...props} className={styles.switch} />;

export default Switch;
