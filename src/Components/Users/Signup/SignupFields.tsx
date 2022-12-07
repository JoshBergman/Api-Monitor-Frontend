import React from 'react';
import Button from '../../UI/Resources/Button';

import styles from '../Shared/Auth.module.css';

export default function SignupFields() {
    
    const submitHandler = () => {
        console.log("Submmited dees")
    };

  return (
    <div>
        <h1 className={styles.title}>Create Account</h1>
        <form>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Email:</label>
                <input className={styles.input} type="email" autoComplete='username' />
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Password:</label>
                <input className={styles.input} type="password" autoComplete='current-password' />
            </div>
            <Button onClick={submitHandler}>Log In</Button>
        </form>
    </div>
  )
}
