import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../Shared/Auth.module.css';
import { logIn } from '../../../Features/AuthSlice';
import settings from '../../../App/Backend';
import Button from '../../UI/Resources/Button';
import Error from '../../UI/GUI/Error-Warning/Error';

export default function SignupFields() {
    const [currEmail, setCurrEmail] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currError, setCurrError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailChangeHandler = (action:any) => {
        setCurrEmail(action.target.value)
    };

    const passwordChangeHandler = (action:any) => {
        setCurrPassword(action.target.value);
    };

    const submitHandler = async (event: any) => {
        event.preventDefault();
        setCurrError(false);
        setIsLoading(true);

        //http req to create new id. Returns object {error: t/f, sid: account-SID}
        const signupResponse = await fetch(settings.url + "/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                email: currEmail,
                password: currPassword
            })
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.error(err);
            setCurrError(true);
        });

        if(signupResponse.error === false){
            dispatch(logIn(signupResponse.sid))
            navigate('/work-area');
            return;
        } else {
            setCurrError(true);
        }

        setIsLoading(false);
    };

  return (
    <div>
        <Error enabled={currError} message={"Cannot create account right now, please try again later."} />
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
                <Button>Loading</Button>
            }
        </form>
    </div>
  )
}
