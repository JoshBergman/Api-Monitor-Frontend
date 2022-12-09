import React, { useState } from 'react';

import styles from './API.module.css';
import { unnestObject } from '../Helpers/Unnester';
import Button from '../../UI/Resources/Button';
import SettingsDisplay from './API-UI/SettingsDisplay';
import APITitle from './API-UI/APITitle';

interface RESTProps {
    settings: {
        title: string;
        endpoint: string;
        method: string;
        body?: string | object;
    }
}

export default function RESTAPI({settings}:RESTProps) {
    const [currRaw, setCurrRaw] = useState({Header: "Headers"});
    const [loading, setLoading] = useState(false);
    const [currReponse, setResponse] = useState({"API" : "Response Body"});

    let response: any;
    let raw: any;
    
    const requestHandler = () => {
        setLoading(true);
        onAPICall();
    };

    const onAPICall = async () => {
        const fetchSettings: any = {
            method: settings.method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if(settings.body){
            fetchSettings.body = JSON.stringify(settings.body);
        }
        response = 
            await fetch(settings.endpoint, fetchSettings
                ).then((response) => {
                raw = response;
                return response.json();}
                ).catch((error) => {
                return {"FATAL-ERROR": error, "CODE" : raw.status}
                }
                );
            
            setCurrRaw(raw);
            setResponse(response);
            setLoading(false);
    };


    
  return (
    <React.Fragment>
        <APITitle settings={settings}/>
        <div className={styles.reqButton}>
            {!loading && <Button onClick={requestHandler}>Make Req</Button>}
            {loading && <Button>LOADING</Button>}
        </div>
        <SettingsDisplay settings={settings} headers={{}}/>

        <div className={styles.infoDiv}>
        </div>
        <h3>Response General:</h3>
        <div className={styles.responseDiv}>
            <ul>            
                {unnestObject( currRaw )}
            </ul>
        </div>
        <h3>Response Body:</h3>
        <div className={styles.responseDiv}>
            <ul>
                {unnestObject( currReponse )}
            </ul>
        </div>
    </React.Fragment>
  )
}
