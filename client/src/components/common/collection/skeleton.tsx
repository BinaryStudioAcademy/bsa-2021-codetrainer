import React, { FC } from "react";
import clsx from "clsx";
import Spinner from "../spinner";
import styles from './collection.module.scss';

const CollectionSkeleton: FC = () => (
	<div className={clsx(styles.collection, styles.skeleton)}>
		<div className={styles.avatar}>
			<Spinner />
		</div>
		<div className={styles.name}>
			<span />
			<span />
		</div>
		<div className={styles.minor}>
			<span />
			<span />
			<span />
		</div>
	</div>
);

export default CollectionSkeleton;
