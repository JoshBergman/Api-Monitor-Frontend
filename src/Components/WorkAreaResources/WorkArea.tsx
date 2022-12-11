import { useSelector } from 'react-redux';

import styles from './WorkArea.module.css';
import APICard from './APIComponents/API-Main/APICard';
import { RootState } from '../../App/Store';

import NewAPIForm from './APIComponents/NewAPIForm/NewAPIForm';

//this component is responsible for rendering the API's cards (unpacking what is held in redux API's state)
export default function WorkArea() {
    const state = useSelector((state:RootState) => state);
    const styleState = state.style;

    const APIList = state.API.APIs;
    let i = 1; //used for mapping keys

  return (
    <div className={styles.workArea}>
        <NewAPIForm styleState={styleState} />
        {APIList.map((API) => {
            i++;
            switch (API.type){
                case "REST": return <APICard key={i} type="REST" APISettings={API.settings} styleState={styleState} headers={API.headers} />;
                case "GRAPHQL": return <APICard key={i} type="GRAPHQL" APISettings={API.settings} styleState={styleState} headers={API.headers} />;
            
                default: return <APICard key={i} type="Error" APISettings={API.settings} styleState={styleState} headers={API.headers} />;
            }
        })}
    </div> 
  )
}
