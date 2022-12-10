import React, { useState } from 'react';

import styles from '../NewAPIForm.module.css';
import NewBodyForm from './NewBodyForm';
import NewQueryForm from './NewQueryForm';

interface Props {
    currType: string;
    setCurrBody: (newBody:string | object) => void;
    currBody: string | object;
    bodyState: {
        includesBody: boolean;
        toggleBody: () => void;
    };
}

//conditionally renders Object for body of REST API or
// will render an object or query for GraphQL API's

export default function BodyQueryManager({setCurrBody, currBody, currType, bodyState}:Props) {
  const [useObjSyntax, setUseObjSyntax] = useState(false);

  const toggleObjSyntax = () => {
    setUseObjSyntax(prev => !prev);
  };

    return (
    <React.Fragment>
    {currType === "REST" &&
    <React.Fragment>
        <label className={styles.label}>Include Body<input className={styles.checkBox} type="checkbox" onChange={bodyState.toggleBody} /></label>
        {bodyState.includesBody &&
            <NewBodyForm current={currBody} setCurr={setCurrBody} />
        }
    </React.Fragment>
    }
    {currType === "GRAPHQL" && 
    <React.Fragment>
        <label className={styles.label}>Use Object Syntax:
        <input className={styles.checkBox} type="checkbox" onChange={toggleObjSyntax} />
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
    </React.Fragment>
  )
}
