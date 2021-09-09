import React, { FC } from 'react';
import { FieldProps, getIn } from 'formik';
import { CreateTabs } from 'components';
import { useState } from 'react';
import { TaskTabTypes } from 'common';
import styles from './form-markdown.module.scss';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

interface IFormMarkdownProps extends FieldProps {
	id: string;
	name: string;
	title?: string;
	tooltip?: string;
	readonly?: boolean;
}

const FormMarkdown: FC<IFormMarkdownProps> = ({
	title,
	tooltip = `Look how your ${title} looks like`,
	readonly = false,
	field: { name, value },
	form: { errors, touched, setFieldValue },
}: IFormMarkdownProps) => {
	const [tab, setTab] = useState<number>(0);
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);

	return (
		<div className={styles.container}>
			<div className={styles.inputField}>
				<CreateTabs
					tabs={[
						{
							header: {
								title: title || '',
							},
							type: TaskTabTypes.TEXT,
							text: value,
							editable: !readonly,
						},
						{
							header: {
								title: 'Preview',
								toolTipTitle: tooltip,
								icon: {
									name: faInfo,
								},
							},
							type: TaskTabTypes.MARKDOWN,
							markdownContent: value,
						},
					]}
					selectedTab={tab}
					onChange={(value) => setFieldValue(name, value)}
					onSelectTab={setTab}
				/>
			</div>
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormMarkdown;
