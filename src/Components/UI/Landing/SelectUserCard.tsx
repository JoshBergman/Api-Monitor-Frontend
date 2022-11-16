import React from 'react';

import Button from '../Resources/Button';
import Card from '../Resources/Card';
import styles from './SelectUserCard.module.css';

interface UserCardProps {
    title: string;
    guest: boolean;
    message: string;
}

export default function SelectUserCard({title, guest, message}:UserCardProps) {
    return (
    <Card height="fit-content" width="250px">
        <React.Fragment>
            <h1>{title}</h1>
            <p>{message}</p>
            {guest && 
                <React.Fragment>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Save endpoint's in local storage</li>
                        <li className={styles.listItem}>No Login Required</li>
                        <li className={styles.listItem}>Quick Setup</li>
                    </ul>
                    <Button to="/guest-home">
                        Continue As Guest
                    </Button>
                </React.Fragment>
            }
            {!guest &&
                <React.Fragment>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Save endpoint's under account</li>
                        <li className={styles.listItem}>Login Required</li>
                        <li className={styles.listItem}>Login Anywhere</li>
                    </ul>
                    <Button to="/login">
                        Login
                    </Button>
                    <Button to="/signup">
                        Singup
                    </Button>
                </React.Fragment>
            }
        </React.Fragment>
    </Card>
  );
}
