import React from 'react';
import { useSelector } from 'react-redux';

import styles from './MobileMenu.module.css';
import { Style } from '../../../../../Features/StyleSlice';
import DarkMode from '../../../Resources/DarkMode';
import { Link } from 'react-router-dom';
import { RootState } from '../../../../../App/Store';

interface Props {
    currStyle: Style;
    toggleMenu: () => void;
}

export default function MobileMenu({currStyle, toggleMenu}:Props) {
    const isLoggedIn = useSelector((state:RootState) => state.Auth.hasSID);

  return (
    <div className={styles.mainContainer}>
        <div className={styles.exitDiv} onClick={toggleMenu}></div>
        <div className={styles.contentDiv} style={currStyle.mutedBackground}>
            <div className={styles.contentAlign} style={currStyle.textColor}>
                <Link className={styles.link} to="work-area">API Sandbox</Link>
                <Link to="/welcome" className={styles.link}>Home</Link>
                {!isLoggedIn &&
                    <React.Fragment>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/signup" className={styles.link}>Sign-up</Link>
                    </React.Fragment>
                }
                {isLoggedIn &&
                    <Link className={styles.link} to="/user/manage">Account</Link>
                }
                <div className={styles.dark}>
                    <DarkMode />
                </div>
            </div>
        </div>
    </div>
  );
}
