import React from 'react';
import { useSelector } from 'react-redux';

import styles from './LandingPage.module.css';
import Card from '../UI/Resources/Card';
import SelectUserCard from '../UI/Landing/SelectUserCard';
import { RootState } from '../../App/Store';

export default function LandingPage() {
  const isLoggedIn = useSelector((state:RootState) => state.Auth.hasSID);

  return (
    <React.Fragment>
      <Card>
          <React.Fragment>
              <h1>API Monitor</h1>
              <h2>Test, Maintain, and Debug Your REST & GraphQL API's!</h2>
          </React.Fragment>
      </Card>
      <div className={styles.flexContainer}>
        {!isLoggedIn &&
        <React.Fragment>
          <SelectUserCard title="Guest" guest={true} message="Use local storage to save your API endpoint's." />
          <SelectUserCard title="Login As User" guest={false} message="Link your API endpoints to your account." />
        </React.Fragment>
        }
        {isLoggedIn &&
          <SelectUserCard title="Logged in as User" guest={false} message="Endpoint's linked to your account." log={isLoggedIn} />
        }
      </div>
  </React.Fragment>
  )
}
