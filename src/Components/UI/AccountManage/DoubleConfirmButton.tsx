import React, { useState } from 'react';

import styles from './DoubleConfirmButton.module.css';
import Button from '../Resources/Button';
import Card from '../Resources/Card';

interface Props {
    shortMessage: string;
    message: string;
    clickFunction: () => void;
}

export default function DoubleConfirmButton({shortMessage, message, clickFunction}:Props) {

    const [showingConfirmModal, setShowingConfirmModal] = useState(false);

    const toggleModal = () => {
        setShowingConfirmModal(prevState => !prevState);
    };

    const confirmHandler = () => {
        clickFunction();
        toggleModal();
    };

  return (
    <React.Fragment>
    {showingConfirmModal &&
        <div className={styles.modalDiv}>
            <div className={styles.cardSpacer} />
            <Card>
                <React.Fragment>
                    <h3>{"Are you sure you would like to " + message}</h3>
                    <Button onClick={confirmHandler}>{shortMessage}</Button>
                    <Button onClick={toggleModal}>Cancel</Button>
                </React.Fragment>
            </Card>
        </div>
    }
    {!showingConfirmModal &&
    <Button onClick={toggleModal}>{shortMessage}</Button>
    }
    </React.Fragment>
  );
}
