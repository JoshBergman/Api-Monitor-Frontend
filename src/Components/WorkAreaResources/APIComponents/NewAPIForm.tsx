import React, { useState, useRef } from 'react'
import Button from '../../UI/Resources/Button';
import Card from '../../UI/Resources/Card'
import { useDispatch, useSelector } from 'react-redux';

import styles from './NewAPIForm.module.css';
import { addNewAPI, API, saveLocalStorage } from '../../../Features/APISlice';
import { RootState } from '../../../App/Store';
import NewBodyForm from './NewBodyForm';
import NewQueryForm from './NewQueryForm';

export default function NewAPIForm() {

    const currTitle = useRef<any>();
    const currType = useRef<any>();
    const currEndpoint = useRef<any>();
    const currMethod = useRef<any>();

    const [makingNew, setMakingNew] = useState(false);
    const [includesBody, setIncludesBody] = useState(false);
    const [currBody, setCurrBody] = useState<any>();
    const [isGraphQL, setIsGraphQL] = useState(false);
    const [useObjSyntax, setUseObjSyntax] = useState(false);

    const toggleBody = () => {
        setIncludesBody((prevState) => {return !prevState;});
    };

    const toggleUseObj = () => {
        setUseObjSyntax((prevState) => {return !prevState});
    };

    const resetState = () => {
        setMakingNew(false);
        setIncludesBody(false);
        setIsGraphQL(false);
        setUseObjSyntax(false);
        setCurrBody('');
    };

    const APITypeHandler = () => {
        if(currType.current.value === "REST"){
            setIsGraphQL(false);
        } else if (currType.current.value === "GRAPHQL"){
            setIsGraphQL(true);
        }
    };

    const currDark = useSelector((state: RootState) => state.style.isDark);

    const dispatch = useDispatch();

    const addAPI = () => {
        const newAPI: API = {
            type: currType.current.value,
            settings: {
                endpoint: currEndpoint.current.value,
                method: currMethod.current.value,
                title: currTitle.current.value
            }
        };
        if(includesBody || isGraphQL) {
            newAPI.settings.body = currBody;
        }

        dispatch(addNewAPI(newAPI));
        dispatch(saveLocalStorage(currDark));
        resetState();
    };

    return (
    <Card height="fit-content" width="90%">
        <React.Fragment>
            {!makingNew && <Button onClick={() => {setMakingNew(true);}} >Register New API</Button>}
        
            {makingNew &&
            <React.Fragment>
                <h2>Register New API</h2>

                <label className={styles.label}>API Label: </label>
                <input ref={currTitle} placeholder="API Title" className={styles.textInput} type="text"/>

                <label className={styles.label}>Endpoint URL: </label>
                <input ref={currEndpoint} className={styles.textInput} type="text"/>

                <label className={styles.label}>API Type: </label>
                <select ref={currType} className={styles.select} onChange={APITypeHandler} >
                    <option className={styles.selectO}>REST</option>
                    <option className={styles.selectO}>GRAPHQL</option>
                </select>

                <label className={styles.label}>Action: </label>
                <select defaultValue="GET" ref={currMethod} className={styles.select}>
                    {isGraphQL && <option className={styles.selectO}>POST</option>}
                    {!isGraphQL &&
                    <React.Fragment>
                        <option className={styles.selectO}>GET</option> 
                        <option className={styles.selectO}>HEAD</option>
                        <option className={styles.selectO}>POST</option>
                        <option className={styles.selectO}>PUT</option>
                        <option className={styles.selectO}>DELETE</option>
                        <option className={styles.selectO}>CONNECT</option>
                        <option className={styles.selectO}>OPTIONS</option>
                        <option className={styles.selectO}>TRACE</option>
                        <option className={styles.selectO}>PATCH</option>
                    </React.Fragment>
                    }
                </select>

                {!isGraphQL &&
                <React.Fragment>
                    <label className={styles.label}>Include Body
                        <input className={styles.checkBox} type="checkbox" onChange={toggleBody} />
                    </label>
                    {includesBody &&
                        <NewBodyForm current={currBody} setCurr={setCurrBody} />
                    }
                </React.Fragment>
                }
                {isGraphQL && 
                <React.Fragment>
                    <label className={styles.label}>Use Object Syntax:
                    <input className={styles.checkBox} type="checkbox" onChange={toggleUseObj} />
                    </label>
                    {useObjSyntax && 
                    <React.Fragment>
                        <label className={styles.label}>Query Object:</label>
                        <NewBodyForm current={currBody} setCurr={setCurrBody} />
                    </React.Fragment>
                    }
                    {!useObjSyntax && 
                    <React.Fragment>
                        <label className={styles.label}>Query:</label>
                        <NewQueryForm current={currBody} setCurr={setCurrBody} />
                    </React.Fragment>
                    }
                </React.Fragment>
                }
                <div className={styles.buttonSpacer}><Button onClick={addAPI}>Save</Button></div>
                <Button onClick={() => {resetState();}}>Cancel</Button>
            </React.Fragment>
            }
        </React.Fragment>
    </Card>
  )
}