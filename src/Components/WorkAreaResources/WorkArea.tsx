import { useSelector } from 'react-redux';

import styles from './WorkArea.module.css';
import APICard from './APIComponents/APICard';
import { RootState } from '../../App/Store';

import NewAPIForm from './APIComponents/NewAPIForm';

//this component is responsible for rendering the API's cards (unpacking what is held in redux API's state)
export default function WorkArea() {
    const APIList = useSelector((state:RootState) => state.API.APIs);
    let i = 1; //used for mapping keys

  return (
    <div className={styles.workArea}>
        <NewAPIForm />
        {APIList.map((API) => {
            i++;
            switch (API.type){
                case "REST": return <APICard key={i} type="REST" APISettings={API.settings} />;
                case "GRAPHQL": return <APICard key={i} type="GRAPHQL" APISettings={API.settings} />;
            
                default: return <APICard key={i} type="Error" APISettings={API.settings} />;
            }
        })}
    </div> 
  )
}
