import React, { useMemo } from 'react';
import clsx from 'clsx';
import { TreeView } from 'components';
import { ITestResult } from 'containers/task-train/logic/state';
import { mapResponseToTree } from './map-response-to-tree';

import styles from './result-test.module.scss';

interface IResultTest {
	test: ITestResult['result'];
}

export const ResultTest: React.FC<IResultTest> = ({ test = {} }) => {
	const { response, error, success } = test;
	const headerContent = useMemo(
		() => `Passes: ${response?.stats.passes ?? 0}, Failed: ${response?.stats.failures ?? 1}`,
		[test],
	);
	const stylesSuccess = useMemo(() => (success ? '_success' : '_error'), [test]);
	if (!Boolean(response) && !Boolean(error)) {
		return <div className={styles.result}></div>;
	}
	const children = useMemo(
		() =>
			mapResponseToTree({
				response,
				successClass: styles.result_color_success,
				errorClass: styles.result_color_error,
				nodeLabelClass: styles.result_bold,
			}),
		[response, error],
	);
	return (
		<div className={clsx(styles.result, styles[`result_border${stylesSuccess}`])}>
			<div className={clsx(styles.result_header, styles[`result_color${stylesSuccess}`])}>{headerContent}</div>
			<TreeView
				nodeLabel={'Result'}
				arrowClass={styles[`result_color${stylesSuccess}`]}
				children={error ? [error] : children}
				nodeLabelClass={styles.result_bold}
			/>
		</div>
	);
};
