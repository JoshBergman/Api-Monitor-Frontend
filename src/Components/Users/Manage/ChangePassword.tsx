import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import styles from '../../Pages/ManageAccount.module.css';
import settings from '../../../App/Backend';
import DoubleConfirmButton from '../../UI/AccountManage/DoubleConfirmButton';
import Error from '../../UI/GUI/Error-Warning/Error';

interface props {
    sid: string | undefined;
}

export default function ChangePassword({sid}:props) {
    const [useHiddenText, setUseHiddenText] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [buttonMsg, setButtonMsg] = useState('Change Password');
    const [buttonColor, setButtonColor] = useState('');
    
    //password management
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const resetError = () => {
        setErrorMsg('');
        setButtonMsg('Change Password');
        setButtonColor('');
    };

    const throwButtonError = () => {
        setButtonMsg('Error');
        setButtonColor('red');
    };

    const toggleHiddenText = () => {
        setUseHiddenText((prevState) => !prevState);
    };

    let passwordStyle = 'disc';

    if(!useHiddenText){
        passwordStyle = 'none';
    }



    //change handlers
    const oldChangeHandler = (event:any) => {
        setOldPass(event.target.value);
        resetError();
    };

    const newChangeHandler = (event:any) => {
        setNewPass(event.target.value);
        resetError();
    };

    const confirmChangeHandler = (event:any) => {
        setConfirmPass(event.target.value);
        resetError();
    };


    //change password operations
    const comparePasswords = () => {
        if(newPass === confirmPass){
            return true;
        } else {
            return false;
        }
    };

    const changePasswordHandler = async () => {
        resetError();
        setButtonMsg('Loading');

        const passwordsMatch = comparePasswords();
        if(!passwordsMatch){
            setErrorMsg('Passwords Don\'t Match');
            throwButtonError();
            return;
        }

        const APIBody = {
            oldPassword: oldPass,
            newPassword: newPass
        };
        
        const changePasswordResponse = await fetch(settings.url + "/update/auth/" + sid,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(APIBody)
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.error(err);
            setErrorMsg("Server Error. Try again later.");
            throwButtonError();
        });

        if(changePasswordResponse.error === true){
            setErrorMsg(changePasswordResponse.msg);
            throwButtonError();
        } else {
            setOldPass('');
            setNewPass('');
            setConfirmPass('');
            setButtonMsg('Success');
            setButtonColor('green');
        }
    };

  return (
    <div className={styles.optionDiv} >
        <h2 className={styles.label}>Change Password</h2>
        <button className={styles.showTextBtn} onClick={toggleHiddenText}>
            {!useHiddenText && <AiOutlineEye className={styles.eyeBall} />}
            {useHiddenText && <AiOutlineEyeInvisible className={styles.eyeBall} />}
        </button>

        {errorMsg !== '' && 
            <Error enabled={true} message={errorMsg} />
        }

        <label className={styles.realLabel}>Old Password</label>
        <input style={{'WebkitTextSecurity': passwordStyle}} className={styles.textInput} type="text" onChange={oldChangeHandler} value={oldPass} />

        <label className={styles.realLabel}>New Password</label>
        <input style={{'WebkitTextSecurity': passwordStyle}} className={styles.textInput} type="text" onChange={newChangeHandler} value={newPass} />

        <label className={styles.realLabel}>Confirm New Password</label>
        <input style={{'WebkitTextSecurity': passwordStyle}} className={styles.textInput} type="text" onChange={confirmChangeHandler} value={confirmPass} />

        <DoubleConfirmButton color={buttonColor} shortMessage={buttonMsg} message="change your password" clickFunction={changePasswordHandler} />
    </div>
  )
}
