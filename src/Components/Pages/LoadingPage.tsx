import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

import Card from '../UI/Resources/Card';
import styles from './LoadingPage.module.css';

export default function LoadingPage() {
  return (
    <Card width="80%" height="80vh" >
        <div className={styles.centerDiv}>
            <div className={styles.spacerDiv} />
            <HashLoader color="#b0a18e" />
        </div>
    </Card>
  );
}
