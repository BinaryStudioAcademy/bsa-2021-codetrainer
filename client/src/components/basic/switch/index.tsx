import React, { FC } from 'react';
import { Switch as BlueprintjsSwitch, SwitchProps } from '@blueprintjs/core';
import styles from './switch.module.scss';

const Switch: FC<SwitchProps> = (props) => <BlueprintjsSwitch {...props} className={styles.switch} />;

export default Switch;
