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
                        <li className={styles.listItem}>Local Storage</li>
                        <li className={styles.listItem}>Up to 100+ APIs</li>
                        <li className={styles.listItem}>Express Setup</li>
                    </ul>
                    <Button to="/work-area">
                        Continue As Guest
                    </Button>
                </React.Fragment>
            }
            {!guest &&
                <React.Fragment>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Cloud Account</li>
                        <li className={styles.listItem}>Up to 20 APIs</li>
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
