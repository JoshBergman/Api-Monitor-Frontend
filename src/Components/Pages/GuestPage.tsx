import React from 'react';

import styles from './GuestPage.module.css';
import Button from '../UI/Resources/Button';
import Card from '../UI/Resources/Card';
import WorkArea from '../WorkAreaResources/WorkArea';

export default function GuestPage() {
  return (
    <React.Fragment>
        <div className={styles.headingDiv}>
            <Button to="/welcome">Welcome Button</Button>
        </div>
        <div className={styles.workingAreaContainer}>
                <WorkArea />
        </div>
    </React.Fragment>
  );
}
