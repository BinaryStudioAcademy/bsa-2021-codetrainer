import React from 'react';
import { Popover2 } from '@blueprintjs/popover2';
import { FC, PropsWithChildren } from 'react';
import infoIcon from 'assets/icons/info-popover.svg';
import styles from './info-popover.module.scss';

const InfoPopover: FC<PropsWithChildren<any>> = ({ children }) => (
	<Popover2
		autoFocus={false}
		enforceFocus={false}
		minimal={false}
		interactionKind="hover"
		popoverClassName={styles.infoPopover}
		placement="bottom"
		content={children}
		modifiers={{
			arrow: { enabled: false },
		}}
	>
		<img className={styles.icon} src={infoIcon} width={15} height={15} alt="info" />
	</Popover2>
);

export default InfoPopover;
