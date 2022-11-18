import React from 'react'

import styles from './APIThumbnail.module.css';
import Button from '../../UI/Resources/Button';

interface ThumbnailProps {
    toggleThumbnail: () => void;
    title: string;
    endpoint: string;
    type: string;
    method: string;
}

export default function APIThumbnail({title, endpoint, type, toggleThumbnail, method}:ThumbnailProps) {
  return (
    <div className={styles.masterContainer}>
        <div className={styles.leftContainer}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.endpoint}>{endpoint}</p>
        </div>
        <div className={styles.rightContainer}>
            <h2 className={styles.type}>{type}</h2>
            <h2 className={styles.type}>{method}</h2>
        </div>
        <div className={styles.expandContainer}>
            <Button onClick={toggleThumbnail}>Expand</Button>
        </div>
    </div>
  )
}
