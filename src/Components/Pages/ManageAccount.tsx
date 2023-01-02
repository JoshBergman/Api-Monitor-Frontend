import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App/Store';

import settings from '../../App/Backend';
import { logOut } from '../../Features/AuthSlice';
import DoubleConfirmButton from '../UI/AccountManage/DoubleConfirmButton';
import Card from '../UI/Resources/Card';
import { resetAPI, saveLocalStorage } from '../../Features/APISlice';

export default function ManageAccount() {

    const state = useSelector((state: RootState) => state);
    const currDark = state.style.isDark;
    const loggedIn: boolean = state.Auth.hasSID;

    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logOut());
    };

    const resetAPIHandler = async() => {
        dispatch(resetAPI());
        dispatch(saveLocalStorage(currDark));
    };

    const changePasswordHandler = () => {};

    const deleteAccountHandler = () => {};

  return (
    <Card>
            <React.Fragment>
            {loggedIn &&
                <React.Fragment>
                    <p>Sample</p>
                    <DoubleConfirmButton shortMessage='Log Out' message='Log Out' clickFunction={logOutHandler} />
                    <DoubleConfirmButton shortMessage="Reset API Endpoint's" message="Reset Endpoint's" clickFunction={resetAPIHandler} />
                    <p>add change password here</p>
                    <DoubleConfirmButton shortMessage='Delete Account' message='delete account and any linked information' clickFunction={deleteAccountHandler} />
                </React.Fragment>
            }
            {!loggedIn && <p>Log In To View (link to login)</p>}
        </React.Fragment>
    </Card>
  )
}
