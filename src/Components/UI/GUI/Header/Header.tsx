import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DarkMode from '../../Resources/DarkMode';

import { RootState } from '../../../../App/Store';
import logoPic from '../Photo/logo.png';
import styles from './Header.module.css';
import MobileNavigation from './Navigation/MobileNavigation';
import NormalNavigation from './Navigation/NormalNavigation';
import { Style } from '../../../../Features/StyleSlice';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 680);

    const styleState = useSelector((state: RootState) => state.style);
    const currStyle:Style = styleState.styles;

    function handleWindowSizeChange() {
        if(window.innerWidth <= 680){
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

  return (
    <React.Fragment>
    <div className={styles.mainHeaderContainer} style={currStyle.mainBackground}>
            {!isMobile && <div className={styles.darkButtonContainer}><DarkMode /></div>}
        <div className={styles.contentContainer}>
            <div className={styles.imgContainer}><Link to="/welcome"><img src={logoPic} className={styles.img} alt="logo"/></Link></div>
            {!isMobile && <NormalNavigation currStyle={currStyle} />}
            {isMobile && <MobileNavigation currStyle={currStyle} />}
            
        </div>
    </div>
    <div className={styles.headerSpacer} />
    </React.Fragment>
  )
}
