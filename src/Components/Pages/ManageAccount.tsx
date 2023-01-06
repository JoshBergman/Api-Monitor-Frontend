import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../App/Store';
import styles from './ManageAccount.module.css';
import Error from '../UI/GUI/Error-Warning/Error';
import settings from '../../App/Backend';
import { logOut } from '../../Features/AuthSlice';
import DoubleConfirmButton from '../UI/AccountManage/DoubleConfirmButton';
import Card from '../UI/Resources/Card';
import { resetAPI, saveLocalStorage } from '../../Features/APISlice';
import { Link } from 'react-router-dom';
import ChangePassword from '../Users/Manage/ChangePassword';

export default function ManageAccount() {
    const [delAccError, setDelAccError] = useState(false);
    const [delAPIsError, setDelAPIsError] = useState(false);

    const navigate = useNavigate();

    const state = useSelector((state: RootState) => state);
    const currDark = state.style.isDark;

    const loggedIn: boolean = state.Auth.hasSID;
    let sid: string | undefined = '';
    if(loggedIn){sid = state.Auth.sid;}

    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logOut());
        navigate('/welcome');
    };


    const resetAPIHandler = async() => {
        setDelAPIsError(false);
        const resetAPIsReponse = await fetch(settings.url + "/list/reset/" + sid,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.error(err);
            setDelAPIsError(true);
        });

        if(resetAPIsReponse.error === true){
            setDelAPIsError(true);
            return;
        }
        dispatch(resetAPI());
        dispatch(saveLocalStorage(currDark));
        navigate('/work-area');
    };


    const deleteAccountHandler = async () => {
        setDelAccError(false);
        const deleteAccountReponse = await fetch(settings.url + "/delete/" + sid,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.error(err);
            setDelAccError(true);
        });

        if(deleteAccountReponse.error === true){
            setDelAccError(true);
            return;
        }
        dispatch(logOut());
        localStorage.clear();
        localStorage.setItem('DARK', currDark + '');
        navigate('/welcome');
    };


  return (
    <Card width='80%' height='fit-content'>
            <React.Fragment>
            {loggedIn &&
                <React.Fragment>
                    <div className={styles.optionDiv} >
                        <h2 className={styles.label}>Sign-Out</h2>
                        <div className={styles.buttonControl}><DoubleConfirmButton shortMessage='Log Out' message='sign out of your account' clickFunction={logOutHandler} /></div>
                    </div>
                    <div className={styles.optionDiv} >
                        <Error enabled={delAPIsError} message={"Server error, try again later."} />
                        <h2 className={styles.label}>Reset ALL Stored API Endpoint's</h2>
                        <DoubleConfirmButton shortMessage="Reset Endpoint's" message="reset API endpoint's" clickFunction={resetAPIHandler} />
                    </div>
                        <ChangePassword sid={sid}/>
                    <div className={styles.optionDiv} >
                        <Error enabled={delAccError} message={"Server error, try again later."} />
                        <h2 className={styles.label}>Delete Your Account</h2>
                        <DoubleConfirmButton color="#cd3232" shortMessage='Delete Account' message='delete account and all associated information' clickFunction={deleteAccountHandler} />
                    </div>
                </React.Fragment>
            }
            {!loggedIn && 
                <p>Log in to view. <Link className={styles.link} to="/login">Login</Link></p>
            }
        </React.Fragment>
    </Card>
  )
}
