import React from 'react';

import styles from './Navigation.module.css';
import { Style } from '../../../../../Features/StyleSlice';

interface Props {
    currStyle: Style;
}

export default function MobileNavigation({currStyle}:Props) {
  return (
    <div className={styles.navContainer}>
    Words 1
    Words 2
</div>
  )
}
