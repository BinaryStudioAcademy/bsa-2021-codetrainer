import React from 'react';
import ClansList from './components/clans-list';
// import ClansSortPanel from './components/clans-sort-panel';
import { IClansProps } from '../types';
import styles from './clans.module.scss';
import { Field, Form, Formik } from 'formik';
import { Button, FormInput } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const ClansPage: React.FC<IClansProps> = ({
	user,
	clans,
	sortByRank,
	sortBySize,
	sortByTime,
	joinClan,
	leaveClan,
	currentSort,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.sectionHeader}>
				<h1>Clans</h1>
			</div>
			<Formik
				initialValues={{
					query: '',
				}}
				// validationSchema={SIGN_IN_SCHEMA}
				onSubmit={(values) => console.log(values)}
			>
				<Form className={styles.form}>
					<div style={{ display: 'flex' }}>
						<Field
							id="query"
							name="query"
							placeholder="Enter clan name"
							type="text"
							component={FormInput}
						/>
						<Button type="submit" className={clsx(ButtonClasses.red, ButtonClasses.filled)} >
							Search
						</Button>
					</div>
				</Form>
			</Formik>
			<section className={styles.clansSection}>

				{/* <ClansSortPanel
					sortByRank={sortByRank}
					sortByTime={sortByTime}
					sortBySize={sortBySize}
					currentSort={currentSort}
				/> */}
				<ClansList joinClan={joinClan} leaveClan={leaveClan} clans={clans} userId={user.id} />
			</section>
		</div>
	);
};

export default ClansPage;
