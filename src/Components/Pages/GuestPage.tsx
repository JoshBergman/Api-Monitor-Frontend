import React from 'react';

import styles from './GuestPage.module.css';
import WorkArea from '../WorkAreaResources/WorkArea';

export default function GuestPage() {
  return (
    <React.Fragment>
        <div className={styles.workingAreaContainer}>
                <WorkArea />
        </div>
    </React.Fragment>
  );
}
