import React, { useRef } from 'react';

import styles from '../NewAPIForm.module.css';
import { unStringObject } from '../../../Helpers/Unstringer';
import { unnestObject } from '../../../Helpers/Unnester';

export interface headerProps {
    headerManage: {
        includesHeader: boolean;
        toggleHeader: () => void;
        currHeaders: any;
        setCurrHeaders: (newHeaders:any) => void;
    };
};

export default function HeaderField({headerManage}:headerProps) {

    const bodyRef = useRef<any>();

    let currBody = {};
    const changeHandler = () => {
        try {
            currBody = unStringObject(bodyRef.current.value); //'../../Helpers/Unstringer';
            const combined = { ...currBody, ...{useDefault: false}};
            headerManage.setCurrHeaders(combined);
        } catch (err) {

        }
    };

  return (
    <React.Fragment>
        <label className={styles.label}>Use Custom Headers<input className={styles.checkBox} type="checkbox" onChange={headerManage.toggleHeader} /></label>
        {headerManage.includesHeader &&
            <React.Fragment>
                <label className={styles.label}>Define Headers:</label>
                <textarea 
                className={styles.bodyInput} 
                ref={bodyRef} 
                onChange={changeHandler} 
                placeholder="{
                    Content-Type : application/json (recommended)
}
                    //DONT use quotes for strings 
                    //auto type-checked for int & boolean
                    //Include ALL headers-
                    //-Nothing is automatically applied 
                    //*Only JSON is currently supported" 
                    />
                <label className={styles.label}>Current Headers:</label>
                <div className={styles.bodyDiv}>
                    <ul>
                        {unnestObject(headerManage.currHeaders)}
                    </ul>
                </div>
            </React.Fragment>
        }
    </React.Fragment>
  )
}
