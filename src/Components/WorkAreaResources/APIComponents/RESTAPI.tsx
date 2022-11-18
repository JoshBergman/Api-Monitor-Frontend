import React, { useState } from 'react';

import styles from './API.module.css';
import Button from '../../UI/Resources/Button';
import APIThumbnail from './APIThumbnail';

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
    const [isThumbnail, setIsThumbnail] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currReponse, setResponse] = useState({"API" : "Response Body"});

    let response: any;
    let raw: any;
    const onAPICall = async () => {
        response = 
            await fetch(settings.endpoint, {
                method: settings.method,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
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

    //recursive function to render the nested object nature of the API response body
    function unnestObject (obj:any) {
        const currList = [];
        let i = 0;
        for(let key in obj) {
            //if a nested object push key and then make new <ul> as a <li> to indicate the nestedness
            if (typeof obj[key] === "object"){
                i++;
                currList.push(<li key={"a" + i}>{key + ": "} <ul key={i}>{unnestObject(obj[key])}</ul> </li>);
            
            } else {
            //if not a nested object push curr value
            i++;
            currList.push(<li key={i}>{[key + ":", " " + obj[key]]}</li>);
            }
    }
        return currList;
    }

    const requestHandler = () => {
        setLoading(true);
        onAPICall();
    };

    const thumbnailHandler = () => {
        setIsThumbnail((prevState) => {return !prevState});
    };

  return (
    <div className={styles.apiContainer}>
        {isThumbnail && <APIThumbnail method={settings.method} title={settings.title} type="REST" endpoint={settings.endpoint} toggleThumbnail={thumbnailHandler} />}
        {!isThumbnail &&
        <React.Fragment>
            <h1 className={styles.title}>{settings.title}</h1>
            <h3 className={styles.title}>API Type: REST</h3>
            <h5 className={styles.title}>Endpoint: {settings.endpoint}</h5>
            <div className={styles.reqButton}>
            {!loading && <Button onClick={requestHandler}>Make Req</Button>}
            {loading && <Button>LOADING</Button>}
            </div>
            <h3>Request Settings:</h3>
            <div className={styles.currSettings}>
                <ul>
                    <li>Method: {settings.method}</li>
                    <li>Mode: CORS</li>
                    <li>Headers: 
                        <ul>
                            <li>Content-Type: application/json</li>
                        </ul>
                    </li>
                    {settings.body &&
                    <li>Body: JSON.stringify({unnestObject(settings.body)})</li>
                    }
                </ul>
            </div>
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
            <div className={styles.reqButton}>
            <Button onClick={thumbnailHandler}>Collapse</Button>
            </div>
        </React.Fragment>
        }
    </div>
  )
}
