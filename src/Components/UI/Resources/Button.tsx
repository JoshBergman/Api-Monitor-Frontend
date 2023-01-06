import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

interface Props {
    children: string | JSX.Element;
    to?: string;
    color?: string;
    onClick?: (event: any) => void | any;
}

interface backgroundColor {
    backgroundColor?: string;
}

export default function Button({children, to, onClick, color}:Props) {
    let buttonColor:backgroundColor = {};
    if(color !== '' || color !== null || color !== undefined){
        buttonColor["backgroundColor"] = color;
    }

    let buttonContent = <button className={styles.button} style={buttonColor}>{children}</button>;

    if (onClick) {
        buttonContent = <button onClick={onClick} className={styles.button} style={buttonColor}>{children}</button>;
    }

  return (
    <React.Fragment>
    {to && 
    <Link to={to}>
        {buttonContent}
    </Link>
    }
    {!to &&
        buttonContent
    }
    </React.Fragment>
  )
}
