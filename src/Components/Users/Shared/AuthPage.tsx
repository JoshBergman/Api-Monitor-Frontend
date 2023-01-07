import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Auth.module.css';
import Card from '../../UI/Resources/Card';
import LoginFields from '../Login/LoginFields';
import SignupFields from '../Signup/SignupFields';
import { RootState } from '../../../App/Store';

interface Props {
    isLoginPage: boolean;
}

export default function AuthPage({isLoginPage}:Props) {
    const currState = useSelector((state: RootState) => state);
    const styleState = currState.style;
    
    const isLoggedIn = currState.Auth.hasSID;

  return (
    <div className={styles.footerSpacer}>
    <Card>
        <React.Fragment>
        {isLoggedIn && <p>Already Logged In</p>}
        
        {!isLoggedIn &&
          <React.Fragment>
              {isLoginPage && <LoginFields />}
              {!isLoginPage && <SignupFields />}

              {!isLoginPage && <p>Already have an account? <Link to="/login" style={styleState.styles.textColor}>Login</Link></p>}
              {isLoginPage && <p>Don't have an accuont? <Link to="/signup" style={styleState.styles.textColor}>Sign-up</Link></p>}
          </React.Fragment>
        }
        </React.Fragment>
    </Card>
    </div>
  );
}
