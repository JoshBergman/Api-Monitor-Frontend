import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../Shared/Auth.module.css';
import Button from '../../UI/Resources/Button';
import { RootState } from '../../../App/Store';
import settings from '../../../App/Backend';

export default function SignupFields() {
    const [currEmail, setCurrEmail] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const isLoggedIn = useSelector((state:RootState) => state.Auth.hasSID);
    
    const emailChangeHandler = (action:any) => {
        setCurrEmail(action.target.value)
    };

    const passwordChangeHandler = (action:any) => {
        setCurrPassword(action.target.value);
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const signupResponse = fetch(settings.url + "/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: currEmail,
                    password: currPassword
                })
            }).then((response) => {
                return response.json();
            });
            console.log(signupResponse);
        } catch (err) {

        }

        setIsLoading(false);
    };

  return (
    <div>
        <h1 className={styles.title}>Create Account</h1>
        <form>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Email:</label>
                <input className={styles.input} type="email" autoComplete='username' onChange={emailChangeHandler} value={currEmail} />
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Password:</label>
                <input className={styles.input} type="password" autoComplete='current-password' onChange={passwordChangeHandler} value={currPassword} />
            </div>
            {!isLoading &&
                <Button onClick={submitHandler}>Create Account</Button>
            }
            {isLoading &&
                <Button>Create Account</Button>
            }
        </form>
    </div>
  )
}
