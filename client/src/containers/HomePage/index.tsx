import React from 'react'

import styles from './homePage.module.scss';
import NextTask from '../NextTask/index';

const HomePage:React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.plug}>Sidebar plug</div>

      <div className={styles.mainWrapper}>
        <div className={styles.plug}>Header plug</div>

        <div className={styles.contentWrapper}>
          <div className={styles.container}>
            <h3 className={styles.userGreeting}>Hi, Rayna!</h3>
            
            <div className={styles.nextTaskWrapper}>
              <NextTask />
            </div>

            <div className={styles.communityWrapper}>
              community
            </div>

            <div className={styles.feedWrapper}>
              feed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;