import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../App/Store';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

const Footer = () => {
    const state = useSelector((state:RootState) => state);

    const styleState = state.style.styles;
    const isLoggedIn = state.Auth.hasSID;

    const containerStyles = {
        ...styleState.mutedBackground,
        ...styleState.textColor
    };

    return (
        <div className={styles.footerContainer} style={containerStyles}>
            <div className={styles.footerHalf}>
                <h1 className={styles.title}>
                    Navigation
                </h1>
                <Link className={styles.desc} to="/welcome">
                    Home
                </Link>
                <Link className={styles.desc} to="/work-area">
                    Work Area
                </Link>
                {isLoggedIn &&
                    <Link className={styles.desc} to="/user/manage">
                        My Account
                    </Link>
                }
                {!isLoggedIn &&
                    <Link className={styles.desc} to="/login">
                        Login
                    </Link>
                }
            </div>
            <div className={styles.footerHalf}>
                <h1 className={styles.title}>
                    Find Me
                </h1>
                <a className={styles.desc} 
                href="https://JoshuaBergman.dev"
                rel="noreferrer"
                target="_blank"
                >
                    Website
                </a>
                <a className={styles.desc}  
                href="https://www.linkedin.com/in/joshua-bergman-399133191/"
                rel="noreferrer"
                target="_blank"
                >
                    LinkedIn
                </a>
                <a className={styles.desc} 
                href="https://github.com/JoshBergman"
                rel="noreferrer"
                target="_blank"
                >
                    GitHub
                </a>
            </div>
        </div>
    );
};

export default Footer;