import React from 'react'

import styles from './WorkArea.module.css';
import APICard from './APIComponents/APICard';

//this component is responsible for rendering the API's cards
export default function WorkArea() {
  return (
    <div className={styles.workArea}>
        <APICard type="REST" />
        <APICard type="GRAPHQL" />
    </div> 
  )
}
