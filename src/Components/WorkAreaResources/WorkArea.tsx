import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './WorkArea.module.css';
import APICard from './APIComponents/APICard';
import { RootState } from '../../App/Store';

import Button from '../UI/Resources/Button'; //used for testing feature currently deleted before deploying
import { populateLocalStorage, saveLocalStorage } from '../../Features/APISlice';
import NewAPIForm from './APIComponents/NewAPIForm';

//this component is responsible for rendering the API's cards
export default function WorkArea() {
    const isDark = useSelector((state: RootState) => state.style.isDark);

    const APIList = useSelector((state:RootState) => state.API.APIs);
    const dispatch = useDispatch();

    const debugutton = () => { //testing feature, delete before deploying
        console.log(APIList);
    }

    const saveAPIs = () => {
        dispatch(saveLocalStorage(isDark));
    };

    let i = 1; //used for mapping keys

  return (
    <div className={styles.workArea}>
        <NewAPIForm />
        {APIList.map((API) => {
            i++;
            switch (API.type){
                case "REST": return <APICard key={i} type="REST" APISettings={API.settings} />;
            
                default: return -1;
            }
        })}
        <Button onClick={debugutton}>log APIList</Button>
        <Button onClick={saveAPIs}>APIS Save</Button>
        <Button onClick={() => {dispatch(populateLocalStorage())}}>APIS Get Storage</Button>
    </div> 
  )
}
