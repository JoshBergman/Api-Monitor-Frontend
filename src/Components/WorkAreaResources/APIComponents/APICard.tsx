import React from 'react';

import Card from '../../UI/Resources/Card';
import RESTAPI from './RESTAPI';
import GRAPHQLAPI from './GRAPHQLAPI';

interface APIProps {
  type: string;
  APISettings: {
    endpoint: string;
    method: string;
    title: string;
    body?: object | string;
  };
}

//use redux to populate the apis then access and sort them from here
//use high level component that is only rendered once to call redux action to populate api list(s)

export default function APICard({type, APISettings}:APIProps) {
  return (
    <Card width="90%" height="fit-content" >
      <React.Fragment>
        { type === "REST" && <RESTAPI settings={APISettings} /> }
        { type === "GRAPHQL" && <GRAPHQLAPI settings={APISettings} /> }
        { type !== "REST" && type !== "GRAPHQL" && <RESTAPI settings={{
        endpoint: APISettings.endpoint,
        method: "Error!",
        title: APISettings.title,
    }} /> }
      </React.Fragment>
    </Card>
  );
}
