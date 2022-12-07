import React from 'react'
import { useSelector } from 'react-redux';

import styles from './Card.module.css';
import { RootState } from '../../../App/Store';

interface Props {
    children: JSX.Element
    width?: string;
    height?: string;
}

interface StyleObject {
    backgroundColor: string;
    color: string;
    width?: string;
    height?: string;
}

export default function Card(props: Props) {

    const style = useSelector((state: RootState) => state.style.styles);

    let combinedStyle: StyleObject = {
        ...style.mutedBackground,
        ...style.textColor,
    }

    if(props.width && props.height){
        combinedStyle = {
            ...style.mutedBackground,
            ...style.textColor,
            width: props.width,
            height: props.height,
        }
    }

    return (
    <div style={combinedStyle} className={styles.card}>
            {props.children}
    </div>
  );
}
