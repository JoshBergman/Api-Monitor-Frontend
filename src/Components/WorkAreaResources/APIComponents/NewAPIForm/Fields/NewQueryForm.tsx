import React, { useRef } from 'react';

import styles from '../NewAPIForm.module.css';


export default function NewQueryForm({current, setCurr}:any) {

    const bodyRef = useRef<any>();

    let currBody = {};
    const changeHandler = () => {
        try {
            currBody = bodyRef.current.value;
            setCurr(currBody);
        } catch (err) {

        }
    };

  return (
    <React.Fragment>
    <textarea className={styles.bodyInput} ref={bodyRef} placeholder="query {
            user {
                id,
                name,
                created
            }
        }
        " onChange={changeHandler} />
    <div className={styles.bodyDiv}>
        <ul>
            {current}
        </ul>
    </div>
    </React.Fragment>
  )
}
