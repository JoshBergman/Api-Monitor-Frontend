import React from 'react';

import styles from './APIUI.module.css';
import { unnestObject } from '../../Helpers/Unnester';
import HeadersDisplay from './HeadersDisplay';

interface SettingsProps {
    settings: {
        title: string;
        endpoint: string;
        method: string;
        body?: string | object;
    };
    headers: object;
    isObj: boolean;
}

export default function SettingsDisplay({settings, headers, isObj}:SettingsProps) {
  const getStringDisplay = (body: string | object) => {
    if (typeof body === "string"){
      return body;
    } else {
      return "Type Error!"
    }
  };
  return (
    <React.Fragment>
    <h3>Request Settings:</h3>
    <div className={styles.currSettings}>
        <ul>
            <li>Method: {settings.method}</li>
            <HeadersDisplay headers={headers} />
        {settings.body &&
        <React.Fragment>
        {isObj && <li>Body: JSON.stringify(<ul>{unnestObject(settings.body)}</ul>)</li>}
        {!isObj && <li>Body: JSON.stringify(<ul><li>{getStringDisplay(settings.body)}</li></ul>)</li>}
        </React.Fragment>
        }
        </ul>
    </div>
    </React.Fragment>
  )
}
