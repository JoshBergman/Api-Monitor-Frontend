import React, { useState, useRef } from 'react'
import Button from '../../UI/Resources/Button';
import Card from '../../UI/Resources/Card'
import { useDispatch, useSelector } from 'react-redux';

import styles from './NewAPIForm.module.css';
import { addNewAPI, API, saveLocalStorage } from '../../../Features/APISlice';
import { RootState } from '../../../App/Store';

export default function NewAPIForm() {

    const currTitle = useRef<any>();
    const currType = useRef<any>();
    const currEndpoint = useRef<any>();
    const currMethod = useRef<any>();

    const [makingNew, setMakingNew] = useState(false);

    const APITypeHandler = () => {
        console.log("Changed API Type");
    };

    const toggleFormHandler = () => {
        setMakingNew((prevState) => {return !prevState});
    };

    const currDark = useSelector((state: RootState) => state.style.isDark);

    const dispatch = useDispatch();

    const addAPI = () => {
        const newAPI: API = {
            type: currType.current.value,
            settings: {
                endpoint: currEndpoint.current.value,
                method: currMethod.current.value,
                title: currTitle.current.value
            }
        };

        dispatch(addNewAPI(newAPI));
        dispatch(saveLocalStorage(currDark));
        toggleFormHandler();
    };

    return (
    <Card height="fit-content" width="90%">
        <React.Fragment>
            {!makingNew && <Button onClick={toggleFormHandler} >Register New API</Button>}
        
            {makingNew &&
            <React.Fragment>
                <h2>Register New API</h2>

                <label className={styles.label}>API Label: </label>
                <input ref={currTitle} placeholder="API Title" className={styles.textInput} type="text"/>

                <label className={styles.label}>Endpoint URL: </label>
                <input ref={currEndpoint} className={styles.textInput} type="text"/>

                <label className={styles.label}>API Type: </label>
                <select ref={currType} className={styles.select} onChange={APITypeHandler} >
                    <option className={styles.selectO}>REST</option>
                    <option className={styles.selectO}>GRAPHQL</option>
                </select>

                <label className={styles.label}>REST Method: </label>
                <select ref={currMethod} className={styles.select}>
                    <option className={styles.selectO}>GET</option>
                    <option className={styles.selectO}>POST</option>
                </select>

                <div className={styles.buttonSpacer}><Button onClick={addAPI}>Save</Button></div>
                <Button onClick={toggleFormHandler}>Cancel</Button>
            </React.Fragment>
            }
        </React.Fragment>
    </Card>
  )
}
