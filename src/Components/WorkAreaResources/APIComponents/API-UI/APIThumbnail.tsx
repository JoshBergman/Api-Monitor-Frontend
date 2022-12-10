import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './APIThumbnail.module.css';

interface ThumbnailProps {
    toggleThumbnail: () => void;
    arrowColor: {color: string};
    type: string;
    APISettings: {
        title: string;
        endpoint: string;
        method: string;
    }
    }

export default function APIThumbnail({type, toggleThumbnail, APISettings, arrowColor}:ThumbnailProps) {
    const thumbnailToggle = () => {
        toggleThumbnail();
    };
  return (
    <div className={styles.masterContainer}>
        <div className={styles.leftContainer}>
            <h1 className={styles.title}>{APISettings.title}</h1>
            <p className={styles.endpoint}>{APISettings.endpoint}</p>
        </div>
        <div className={styles.rightContainer}>
            <h2 className={styles.type}>{type}</h2>
            <h2 className={styles.type}>{APISettings.method}</h2>
        </div>
        <div className={styles.expandContainer}>
            <button className={styles.expandButton} onClick={thumbnailToggle}><IoIosArrowDown style={arrowColor} className={styles.expandArrow} /></button>
        </div>
    </div>
  )
}
