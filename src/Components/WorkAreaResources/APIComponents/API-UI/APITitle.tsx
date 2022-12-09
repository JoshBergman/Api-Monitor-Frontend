import React from 'react';

import styles from  './APIUI.module.css';

interface Props {
    settings: {
        title: string;
        endpoint: string;
        method: string;
        body?: string | object;
    }
}

export default function APITitle({settings}: Props) {
    return (
    <React.Fragment>
        <h1 className={styles.title}>{settings.title}</h1>
        <h3 className={styles.title}>API Type: REST</h3>
        <h5 className={styles.title}>Endpoint: {settings.endpoint}</h5>
    </React.Fragment>
  )
}