import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

interface Props {
    children: string | JSX.Element;
    to?: string;
}

export default function Button({children, to}:Props) {

    const buttonContent = <button className={styles.button}>{children}</button>;

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
