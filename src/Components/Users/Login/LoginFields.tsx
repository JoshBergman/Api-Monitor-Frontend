import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../Shared/Auth.module.css';
import { logIn } from '../../../Features/AuthSlice';
import settings from '../../../App/Backend';
import Button from '../../UI/Resources/Button';
import Error from '../../UI/GUI/Error-Warning/Error';
import { saveLocalStorage, setAPI } from '../../../Features/APISlice';
import { RootState } from '../../../App/Store';

export default function SignupFields() {
    const [currEmail, setCurrEmail] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currError, setCurrError] = useState(false);

    const currDark = useSelector((state:RootState) => state.style.isDark);
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
        const loginString = currEmail + "-mkr-" + currPassword;
        const signupResponse = await fetch(settings.url + "/login/" + loginString,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.error(err);
            setCurrError(true);
        });

        if(signupResponse.error === false){
            dispatch(logIn(signupResponse.sid));
            const userAPIList = signupResponse.APILIST
            dispatch(setAPI(userAPIList));
            dispatch(saveLocalStorage(currDark));
            navigate('/work-area');
            return;
        } else {
            setCurrError(true);
        }

        setIsLoading(false);
    };

  return (
    <div>
        <Error enabled={currError} message={"Cannot login right now, please try again later."} />
        <h1 className={styles.title}>Login</h1>
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
