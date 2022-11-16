import React from 'react'
import { useDispatch } from 'react-redux';

import styles from './LandingPage.module.css';
import Card from '../UI/Resources/Card';
import SelectUserCard from '../UI/Landing/SelectUserCard';
import { toggleDark } from '../../Features/StyleSlice';

export default function LandingPage() {

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Card>
          <React.Fragment>
              <h1>API Monitor</h1>
              <h2>Test, Maintain, and Debug Your REST & GraphQL API's!</h2>
          </React.Fragment>
      </Card>
      <div className={styles.flexContainer}>
        <SelectUserCard title="Guest" guest={true} message="Use local storage to save your API endpoint's" />
        <SelectUserCard title="Login As User" guest={false} message="Link your API endpoints to your account." />
      </div>
      <button onClick={() => {dispatch(toggleDark())}}>Dark mode</button>
  </React.Fragment>
  )
}
