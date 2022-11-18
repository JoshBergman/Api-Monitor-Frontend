import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

interface Props {
    children: string | JSX.Element;
    to?: string;
    onClick?: () => void;
}

export default function Button({children, to, onClick}:Props) {

    let buttonContent = <button className={styles.button}>{children}</button>;

    if (onClick) {
        buttonContent = <button onClick={onClick} className={styles.button}>{children}</button>;
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
