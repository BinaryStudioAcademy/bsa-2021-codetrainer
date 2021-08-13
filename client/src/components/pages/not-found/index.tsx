import React from 'react';
import styles from './not-found.module.scss';
import { Button, CoverLayout } from 'components';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';


const NotFound: React.FC = () => {
    return (
        <CoverLayout className={styles.container}>
            <div className={styles.content} >
                <div className={styles.mainHeader} >404</div>
                <div className={styles.secondHeader} >You got lost, or we got lost</div>
                <Button type="submit" className={clsx(ButtonClasses.red, ButtonClasses.filled)} onClick={() => historyHelper.push(ROUTES.Home)}>
                    Go Back
                </Button>
            </div>
        </CoverLayout>
    );
};

export default NotFound;
