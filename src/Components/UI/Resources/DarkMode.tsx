import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CgDarkMode } from 'react-icons/cg';

import styles from './Button.module.css';
import { useDispatch } from 'react-redux';
import { toggleDark } from '../../../Features/StyleSlice';
import { RootState } from '../../../App/Store';


export default function DarkMode() {
    const [youSpinMeRightRoundBabyRightRound, setLikeARecordBabyRightRound] = useState(false);

    const dispatch = useDispatch();

    const rightRound = () => {
        setLikeARecordBabyRightRound((prevState) => {return !prevState});
    };

    const toggleDarkHandler = () => {
        rightRound();
        dispatch(toggleDark());
    };

    const currColor = useSelector((state: RootState) => state.style.styles.textColor.color);

  return (
    <button className={styles.darkButton} onClick={toggleDarkHandler}>
        <CgDarkMode 
        className={styles.darkIcon} 
        style={youSpinMeRightRoundBabyRightRound ? {transform: "rotate(180deg)", color: currColor} : {transform: "rotate(0)", color: currColor}} 
        />
    </button>
  )
}
