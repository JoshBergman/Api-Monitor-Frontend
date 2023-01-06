import React, { useState } from 'react';

import styles from './DoubleConfirmButton.module.css';
import Button from '../Resources/Button';
import Card from '../Resources/Card';

interface Props {
    shortMessage: string;
    message: string;
    color?: string;
    clickFunction: () => void;
}

export default function DoubleConfirmButton({shortMessage, message, clickFunction, color}:Props) {
    let specialColor = '';
    if(color){
        specialColor = color;
    }

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
            <Card width='280px' height="fit-content">
                <React.Fragment>
                    <h3>{"Are you sure you would like to " + message + "?"}</h3>
                    <Button color={specialColor} onClick={confirmHandler}>{shortMessage}</Button>
                    <Button onClick={toggleModal}>Cancel</Button>
                </React.Fragment>
            </Card>
        </div>
    }
    {!showingConfirmModal &&
    <Button color={specialColor} onClick={toggleModal}>{shortMessage}</Button>
    }
    </React.Fragment>
  );
}
