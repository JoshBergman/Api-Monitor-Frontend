import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './APIThumbnail.module.css';
import Button from '../../UI/Resources/Button';

interface ThumbnailProps {
    toggleThumbnail: () => void;
    title: string;
    endpoint: string;
    type: string;
    method: string;
    arrowColor: {color: string};
}

export default function APIThumbnail({title, endpoint, type, toggleThumbnail, method, arrowColor}:ThumbnailProps) {
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
            <button className={styles.expandButton} onClick={toggleThumbnail}><IoIosArrowDown style={arrowColor} className={styles.expandArrow} /></button>
        </div>
    </div>
  )
}
