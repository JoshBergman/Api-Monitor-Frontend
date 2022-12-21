import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LandingPage.module.css';
import Card from '../UI/Resources/Card';
import SelectUserCard from '../UI/Landing/SelectUserCard';

export default function LandingPage() {

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
      <Link to="/user/manage">MANAGE</Link>
  </React.Fragment>
  )
}
