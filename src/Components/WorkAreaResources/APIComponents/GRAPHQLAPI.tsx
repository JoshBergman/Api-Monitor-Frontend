import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowUp } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

import styles from './API.module.css';
import Button from '../../UI/Resources/Button';
import APIThumbnail from './APIThumbnail';
import { RootState } from '../../../App/Store';
import { delAPI, saveLocalStorage } from '../../../Features/APISlice';
import { unnestObject } from '../Helpers/Unnester';

interface GRAPHProps {
    settings: {
        title: string;
        endpoint: string;
        method: string;
        body?: string | object;
    }
}

export default function GRAPHQLAPI({settings}:GRAPHProps) {
    const [currRaw, setCurrRaw] = useState({Header: "Headers"});
    const [isThumbnail, setIsThumbnail] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currReponse, setResponse] = useState({"API" : "Response Body"});

    const dispatch = useDispatch();

    let response: any;
    let raw: any;
    
    const onAPICall = async () => {
        const fetchSettings: any = {
            method: settings.method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify(settings.body), //query required (body required)
        };
        if(typeof settings.body === "string"){
          fetchSettings.body = JSON.stringify({query: settings.body});
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

    const requestHandler = () => {
        setLoading(true);
        onAPICall();
    };

    const thumbnailHandler = () => {
        setIsThumbnail((prevState) => {return !prevState});
    };

    const styleRedux = useSelector((state:RootState) => state.style);
    const arrowColor = styleRedux.styles.textColor;
    const currDark = styleRedux.isDark;



  return (
    <div className={styles.apiContainer}>
        {isThumbnail && <APIThumbnail arrowColor={arrowColor} method="" title={settings.title} type="GraphQL" endpoint={settings.endpoint} toggleThumbnail={thumbnailHandler} />}
        {!isThumbnail &&
        <React.Fragment>
            <h1 className={styles.title}>{settings.title}</h1>
            <h3 className={styles.title}>API Type: GraphQL</h3>
            <h5 className={styles.title}>Endpoint: {settings.endpoint}</h5>
            <div className={styles.reqButton}>
            {!loading && <Button onClick={requestHandler}>Make Req</Button>}
            {loading && <Button>LOADING</Button>}
            </div>
            <h3>Request Settings:</h3>
            <div className={styles.currSettings}>
                <ul>
                    <li>Method: {settings.method}</li>
                    <li>Headers: 
                        <ul>
                            <li>Content-Type: application/json</li>
                            <li>Accept: application/json</li>
                        </ul>
                    </li>
                    {(typeof settings.body === "string") &&
                    <li>Body: JSON.stringify({"{"}query: <ul>{settings.body}</ul>){"}"}</li>
                    }
                    {(typeof settings.body === "object") &&
                    <li>Body: JSON.stringify(<ul>{unnestObject(settings.body)}</ul>)</li>
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
            <button className={styles.trashButton} onClick={() => {dispatch(delAPI(settings.title)); dispatch(saveLocalStorage(currDark)); thumbnailHandler();}}><FaTrash className={styles.trashCan} /></button>
            <div className={styles.reqButton}>
            <button className={styles.collapseButton} onClick={thumbnailHandler}><IoIosArrowUp style={arrowColor} className={styles.collapseArrow} /></button>
            </div>
        </React.Fragment>
        }
    </div>
  )
}
