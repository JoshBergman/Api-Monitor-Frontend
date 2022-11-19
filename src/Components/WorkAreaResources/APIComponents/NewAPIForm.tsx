import React, { useState } from 'react'
import Button from '../../UI/Resources/Button';
import Card from '../../UI/Resources/Card'

import styles from './NewAPIForm.module.css';

export default function NewAPIForm() {

    const [makingNew, setMakingNew] = useState(false);

    const APITypeHandler = () => {
        console.log("Changed API Type");
    };

    const toggleFormHandler = () => {
        setMakingNew((prevState) => {return !prevState});
    };

    const submitHandler = () => {
        console.log("Clicked Submit");
    };

    return (
    <Card height="fit-content" width="90%">
        <React.Fragment>
            {!makingNew && <Button onClick={toggleFormHandler} >Register New API</Button>}
        
            {makingNew &&
            <React.Fragment>
                <h2>Register New API</h2>
                <label className={styles.label}>Endpoint URL: </label>
                <input className={styles.textInput} type="text"/>
                <label className={styles.label}>API Type: </label>
                <select className={styles.select} onChange={APITypeHandler} >
                    <option className={styles.selectO}>REST</option>
                    <option className={styles.selectO}>GRAPHQL</option>
                </select>
                <label className={styles.label}>Method: </label>
                <select className={styles.select}>
                    <option className={styles.selectO}>GET</option>
                    <option className={styles.selectO}>POST</option>
                </select>
                <div className={styles.buttonSpacer}><Button onClick={submitHandler}>Save</Button></div>
                <Button onClick={toggleFormHandler}>Cancel</Button>
            </React.Fragment>
            }
        </React.Fragment>
    </Card>
  )
}
