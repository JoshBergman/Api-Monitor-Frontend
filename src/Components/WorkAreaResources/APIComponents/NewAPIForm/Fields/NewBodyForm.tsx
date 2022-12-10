import React, { useRef } from 'react';

import styles from '../NewAPIForm.module.css';
import { unStringObject } from '../../../Helpers/Unstringer';
import { unnestObject } from '../../../Helpers/Unnester';


export default function NewBodyForm({current, setCurr}:any) {

    const bodyRef = useRef<any>();

    let currBody = {};
    const changeHandler = () => {
        try {
            currBody = unStringObject(bodyRef.current.value); //'../../Helpers/Unstringer';
            setCurr(currBody);
        } catch (err) {

        }
    };

  return (
    <React.Fragment>
    <textarea className={styles.bodyInput} ref={bodyRef} placeholder="{
        Key : Value,
        ExampleOf : 
        {
            Nested : Object
        }}" onChange={changeHandler} />
    <label className={styles.label}>Current Body:</label>
    <div className={styles.bodyDiv}>
        <ul>
            {unnestObject(current)}
        </ul>
    </div>
    </React.Fragment>
  )
}
