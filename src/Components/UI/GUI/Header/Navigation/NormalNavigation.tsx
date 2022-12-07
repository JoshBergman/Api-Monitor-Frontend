import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import { Style } from '../../../../../Features/StyleSlice';
interface Props {
    currStyle: Style
}

export default function NormalNavigation({currStyle}:Props) {
  return (
    <div className={styles.navContainer}>
        <Link className={styles.link} style={currStyle.textColor} to="welcome">Home</Link>
        <Link className={styles.link} style={currStyle.textColor} to="login">Log In</Link>
    </div>
  )
}
