import React, { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';

import styles from './Navigation.module.css';
import { Style } from '../../../../../Features/StyleSlice';
import MobileMenu from './MobileMenu';

interface Props {
    currStyle: Style;
}

interface Burger {
  color: string;
  transform?: string;
}

export default function MobileNavigation({currStyle}:Props) {
  const [showingMenu, setShowingMenu] = useState(false);

  let burgerStyle:Burger = {
    ...currStyle.textColor,
  };

  const burgerClickHandler = () => {
    setShowingMenu(prevState => !prevState);
  };

  if (showingMenu) {
    burgerStyle = {
      ...currStyle.textColor,
      transform: "rotate(-90deg)",
    };
  }

  return (
    <div className={styles.mobileNavContainer}>
      <div className={styles.hamburgerContainer}>
        <button className={styles.hamButton} onClick={burgerClickHandler}>
          <FaHamburger className={styles.hamburger} style={burgerStyle} />
        </button>
      </div>
      {showingMenu && <MobileMenu currStyle={currStyle} toggleMenu={burgerClickHandler} />}
    </div>
  )
}
