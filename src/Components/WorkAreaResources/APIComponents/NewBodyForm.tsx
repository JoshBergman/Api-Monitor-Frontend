import React, { useRef } from 'react';

import styles from './NewAPIForm.module.css';


export default function NewBodyForm({current, setCurr}:any) {

    const bodyRef = useRef<any>();

    const unStringObject = (str:any) => {
        let currItem = '';
        let currKey = '';
        let currValue = '';
        let wasObj = false;
    
        const thisObj: any = {};
        for(let i = 1; i < str.length; i++){
            if(str[i] === ':'){
                currKey = currItem.trim();
                currItem = '';
            }
            else if(str[i] === ","){
                if(wasObj){
                wasObj = false;
                } else {
                currValue = currItem.trim();
                currItem = '';
                
                thisObj[currKey] = currValue;
            }
            }
            else if(str[i] === '{'){
                while(str[i] !== '}' && i < str.length){
                    currItem += str[i];
                    i++;
                }
                currItem += str[i];
                currItem = unStringObject(currItem.trim());
                thisObj[currKey] = currItem;
                currItem = '';
                wasObj = true;
                i++;
            }
            else if(str[i] === '}'){
                thisObj[currKey] = currItem.trim();
            }
            else {
                currItem += str[i];
            }
        }
        return thisObj;
    };

    let currBody = {};
    const changeHandler = () => {
        try {
            currBody = unStringObject(bodyRef.current.value);
            setCurr(currBody);
        } catch (err) {

        }
    };

    function unnestObject (obj:any) {
        const currList = [];
        let i = 0;
        for(let key in obj) {
            //if a nested object push key and then make new <ul> as a <li> to indicate the nestedness
            if (typeof obj[key] === "object"){
                i++;
                currList.push(<li key={"a" + i}>{key + ": "} <ul key={i}>{unnestObject(obj[key])}</ul> </li>);
            
            } else {
            //if not a nested object push curr value
            i++;
            currList.push(<li key={i}>{[key + ":", " " + obj[key]]}</li>);
            }
    }
        return currList;
    }

  return (
    <React.Fragment>
    <textarea className={styles.bodyInput} ref={bodyRef} placeholder="{
        Key : Value,
        ExampleOf : 
        {
            Nested : Object
        }}" onChange={changeHandler} />
    <div className={styles.bodyDiv}>
        <ul>
            {unnestObject(current)}
        </ul>
    </div>
    </React.Fragment>
  )
}
