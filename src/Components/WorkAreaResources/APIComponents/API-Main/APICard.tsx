import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowUp } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

import styles from './API.module.css';
import { StyleState } from '../../../../Features/StyleSlice';

import Card from '../../../UI/Resources/Card';
import APIThumbnail from '../API-UI/APIThumbnail';
import RESTAPI from './RESTAPI';
import GRAPHQLAPI from './GRAPHQLAPI';

import { delAPI, saveLocalStorage } from '../../../../Features/APISlice';
import { RootState } from '../../../../App/Store';
import { rmAPIFromDB } from '../../../../Features/APILogic/addAPIToDB';


interface APIProps {
  type: string;
  APISettings: {
    endpoint: string;
    method: string;
    title: string;
    body?: object | string;
  };
  headers: any;
  styleState: StyleState;
}

export default function APICard({type, APISettings, styleState, headers}:APIProps) {
  const authState = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();
  
  const [isThumbnail, setIsThumbnail] = useState(true);

  const arrowColor = styleState.styles.textColor;
  const currDark = styleState.isDark;

  const toggleThumbnail = () => {
    setIsThumbnail(prevState => !prevState);
  };

  const deleteHandler = () => {
    if(authState.hasSID){ rmAPIFromDB(authState.sid, APISettings.title); }
    dispatch(delAPI(APISettings.title)); 
    dispatch(saveLocalStorage(currDark)); 
    toggleThumbnail();
  };

  const renderAPI = (type:string) => {
    switch (type) {

      case "REST": return <RESTAPI settings={APISettings} headers={headers}/>;
      case "GRAPHQL": return <GRAPHQLAPI settings={APISettings} headers={headers} />;
      case "Error": return <RESTAPI 
      headers={headers}
      settings={{
        endpoint: APISettings.endpoint,
        method: "Error!",
        title: APISettings.title,
    }} />;

      default: return <RESTAPI 
      headers={headers}
      settings={{
        endpoint: APISettings.endpoint,
        method: "Worse Error!",
        title: APISettings.title,
    }} />;
    }
  }

  return (
    <Card width="90%" height="fit-content" >
      <div className={styles.apiContainer}>
          {isThumbnail && <APIThumbnail type={type} APISettings={APISettings} arrowColor={arrowColor} toggleThumbnail={toggleThumbnail} />}
          {!isThumbnail && 
          <React.Fragment>
            {renderAPI(type)}

          <button className={styles.trashButton} onClick={deleteHandler}>
            <FaTrash className={styles.trashCan} />
          </button>
          <div className={styles.reqButton}>
            <button className={styles.collapseButton} onClick={toggleThumbnail}>
              <IoIosArrowUp style={arrowColor} className={styles.collapseArrow} />
            </button>
          </div>
          </React.Fragment>
          }
      </div>
    </Card>
  );
}
