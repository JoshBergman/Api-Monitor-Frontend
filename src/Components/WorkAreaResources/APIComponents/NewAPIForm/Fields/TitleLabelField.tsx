import React, { useRef, useState } from 'react';

import styles from '../NewAPIForm.module.css';

interface Props {
  setCurrTitle: (newVal:string) => void;
  setCurrEndpoint: (newVal:string) => void;
  setCurrType: (newVal:string) => void;
  setCurrAction: (newVal:string) => void;
}

export default function TitleLabelField({setCurrTitle, setCurrEndpoint, setCurrType, setCurrAction}:Props) {
  const titleRef:any = useRef();
  const endpointRef:any = useRef();
  const currTypeRef:any = useRef();
  const currActionRef:any = useRef();

  const [isGraphQL, setIsGraphQL] = useState(false);

  const titleChangeHandler = () => {
    setCurrTitle(titleRef.current.value);
  };

  const endpointChangeHandler = () => {
    setCurrEndpoint(endpointRef.current.value);
  };

  const currTypeChangeHandler = () => {
    let currType = currTypeRef.current.value;
    setCurrType(currType);
    
    if(currType === 'GRAPHQL'){
      setIsGraphQL(true);
      setCurrAction('POST');
    } else if (currType === 'REST'){
      setIsGraphQL(false);
    }
  };

  const currActionChangeHandler = () => {
    setCurrAction(currActionRef.current.value);
  };

  return (
    <React.Fragment>
        <label className={styles.label}>API Label: </label>
        <input 
        ref={titleRef}
        onChange={titleChangeHandler} 
        placeholder="API Title" 
        className={styles.textInput} 
        type="text"/>

        <label className={styles.label}>Endpoint URL: </label>
        <input 
        ref={endpointRef}
        onChange={endpointChangeHandler} 
        className={styles.textInput} 
        type="text"/>

        <label className={styles.label}>API Type: </label>
        <select 
        ref={currTypeRef} 
        defaultValue="REST"
        className={styles.select} 
        onChange={currTypeChangeHandler} 
        >
            <option className={styles.selectO}>REST</option>
            <option className={styles.selectO}>GRAPHQL</option>
        </select>

        <label className={styles.label}>Action Verb: </label>
          <select 
          defaultValue="GET" 
          ref={currActionRef} 
          className={styles.select} 
          onChange={currActionChangeHandler}
          >
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
    </React.Fragment>
  );
}
