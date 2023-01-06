import React from 'react';

import styles from './Error.module.css';

interface ErrorProps {
    enabled: boolean;
    message?: string;
}

export default function Error({enabled, message}:ErrorProps) {
  return (
    <React.Fragment>
    {enabled &&
        <div className={styles.errorContainer}>
            <h1 className={styles.errorTitle}>Error!</h1>
            <p className={styles.errorMsg}>{message}</p>
        </div>
    }
    {!enabled && 
        <div className={styles.hidden}></div>
    }
    </React.Fragment>
  )
}
