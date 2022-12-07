import React from 'react';

import styles from './MobileMenu.module.css';
import { Style } from '../../../../../Features/StyleSlice';
import DarkMode from '../../../Resources/DarkMode';
import { Link } from 'react-router-dom';

interface Props {
    currStyle: Style;
    toggleMenu: () => void;
}

export default function MobileMenu({currStyle, toggleMenu}:Props) {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.exitDiv} onClick={toggleMenu}></div>
        <div className={styles.contentDiv} style={currStyle.mutedBackground}>
            <div className={styles.contentAlign} style={currStyle.textColor}>
                <Link to="/welcome" className={styles.link}>Home</Link>
                <Link to="/login" className={styles.link}>Login</Link>
                <Link to="/signup" className={styles.link}>Sign-up</Link>
                <div className={styles.dark}>
                    <DarkMode />
                </div>
            </div>
        </div>
    </div>
  )
}
