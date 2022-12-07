import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Card from '../../UI/Resources/Card';
import LoginFields from '../Login/LoginFields';
import SignupFields from '../Signup/SignupFields';
import { RootState } from '../../../App/Store';

interface Props {
    isLoginPage: boolean;
}

export default function AuthPage({isLoginPage}:Props) {
    const styleState = useSelector((state: RootState) => state.style);

  return (
    <Card>
        <React.Fragment>
            {isLoginPage && <LoginFields />}
            {!isLoginPage && <SignupFields />}

            {!isLoginPage && <p>Already have an account? <Link to="/login" style={styleState.styles.textColor}>Login</Link></p>}
            {isLoginPage && <p>Don't have an accuont? <Link to="/signup" style={styleState.styles.textColor}>Sign-up</Link></p>}
        </React.Fragment>
    </Card>
  );
}
