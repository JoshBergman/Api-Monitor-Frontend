import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Navigation.module.css';
import { Style } from '../../../../../Features/StyleSlice';
import { RootState } from '../../../../../App/Store';

interface Props {
    currStyle: Style
}

export default function NormalNavigation({currStyle}:Props) {
  const isLoggedIn = useSelector((state:RootState) => state.Auth.hasSID);
  return (
    <div className={styles.navContainer}>
      <Link className={styles.link} style={currStyle.textColor} to="work-area">API Sandbox</Link>
      {!isLoggedIn &&
      <React.Fragment>
          <Link className={styles.link} style={currStyle.textColor} to="welcome">Home</Link>
          <Link className={styles.link} style={currStyle.textColor} to="login">Log In</Link>
      </React.Fragment>
      }
      {isLoggedIn &&
        <Link className={styles.link} style={currStyle.textColor} to="/user/manage">Account</Link>
      }
    </div>
  )
}
