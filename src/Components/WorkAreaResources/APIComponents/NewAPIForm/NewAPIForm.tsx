import React, { useState } from 'react'
import Button from '../../../UI/Resources/Button';
import Card from '../../../UI/Resources/Card'
import { useDispatch } from 'react-redux';

import styles from './NewAPIForm.module.css';
import { addNewAPI, saveLocalStorage, API, settings } from '../../../../Features/APISlice';
import { StyleState } from '../../../../Features/StyleSlice';
import TitleLabelField from './Fields/TitleLabelField';
import BodyQueryManager from './Fields/BodyQueryManager';
import HeaderField from './Fields/HeaderField';
import { headerProps } from './Fields/HeaderField';

interface styleProps {
    styleState: StyleState;
  }

export default function NewAPIForm({styleState}:styleProps) {

    //manages fields
    const [makingNew, setMakingNew] = useState(false);
    const [includesBody, setIncludesBody] = useState(false);
    const [includesHeader, setIncludesHeader] = useState(false);
    
    //manages values
    const [currType, setCurrType] = useState('REST');
    const [currTitle, setCurrTitle] = useState('');
    const [currEndpoint, setCurrEndpoint] = useState('');
    const [currAction, setCurrAction] = useState('GET');
    const [currBody, setCurrBody] = useState<any>();
    const [currHeaders, setCurrHeaders] = useState<any>();

    const toggleBody = () => {
        setIncludesBody((prevState) => {return !prevState;});
    };

    const toggleHeaders = () => {
        setIncludesHeader(prev => !prev);
    };

    const bodyState = {
        includesBody: includesBody,
        toggleBody: toggleBody,
    };

    const headerManage:headerProps = {
        headerManage: {
            includesHeader: includesHeader,
            toggleHeader: toggleHeaders,
            currHeaders: currHeaders,
            setCurrHeaders: setCurrHeaders,
        }
    };

    const resetState = () => {
        setMakingNew(false);
        setIncludesBody(false);
        setIncludesHeader(false);

        setCurrType('REST');
        setCurrTitle('');
        setCurrEndpoint('');
        setCurrAction('GET');
        setCurrBody('');
    };

    const dispatch = useDispatch();

    const cancelHandler = () => {
        resetState();
    };

    const submitHandler = () => {
        const newAPISettings: settings = {
            title: currTitle,
            endpoint: currEndpoint,
            method: currAction
        }
        if(currBody){
            newAPISettings.body = currBody
        }
        
        const newAPI:API = { //api to be added to redux
            type: currType,
            settings: newAPISettings,
        }
        if(includesHeader){
            newAPI.headers = currHeaders;
        }
        dispatch(addNewAPI(newAPI));
        dispatch(saveLocalStorage(styleState.isDark))
        resetState();
    };

    return (
    <Card height="fit-content" width="90%">
        <React.Fragment>
            {!makingNew && <Button onClick={() => {setMakingNew(true);}} >Register New API</Button>}
            {makingNew &&
            <React.Fragment>
                <h2>Register New API</h2>
                <TitleLabelField 
                setCurrEndpoint={setCurrEndpoint} 
                setCurrTitle={setCurrTitle} 
                setCurrType={setCurrType} 
                setCurrAction={setCurrAction} 
                />
                <HeaderField headerManage={headerManage.headerManage} />
                <BodyQueryManager 
                currBody={currBody} 
                setCurrBody={setCurrBody} 
                currType={currType} 
                bodyState={bodyState} 
                />
                <div className={styles.buttonSpacer}>
                    <Button onClick={submitHandler}>Save</Button>
                </div>
                <Button onClick={cancelHandler}>Cancel</Button>
            </React.Fragment>
            }
        </React.Fragment>
    </Card>
  )
}