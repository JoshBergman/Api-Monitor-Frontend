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
}

export default function SettingsDisplay({settings, headers}:SettingsProps) {
  return (
    <React.Fragment>
    <h3>Request Settings:</h3>
    <div className={styles.currSettings}>
        <ul>
            <li>Method: {settings.method}</li>
            <li>Headers: 
                <ul>
                    <li>Content-Type: application/json</li>
                </ul>
            </li>
        {settings.body &&
        <li>Body: JSON.stringify(<ul>{unnestObject(settings.body)}</ul>)</li>
        }
        </ul>
    </div>
    <HeadersDisplay />
    </React.Fragment>
  )
}
