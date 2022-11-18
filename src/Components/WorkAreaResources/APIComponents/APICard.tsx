import React from 'react';

import Card from '../../UI/Resources/Card';
import RESTAPI from './RESTAPI';
import GRAPHQLAPI from './GRAPHQLAPI';

interface APIProps {
  type: string;
}

//use redux to populate the apis then access and sort them from here
//use high level component that is only rendered once to call redux action to populate api list(s)

export default function APICard({type}:APIProps) {
  return (
    <Card width="90%" height="fit-content" >
      <React.Fragment>
        { type === "REST" && <RESTAPI url="https://swapi.dev/api/people/1/" title="SWAPI" method="GET" /> }
        { type === "GRAPHQL" && <GRAPHQLAPI /> }
      </React.Fragment>
    </Card>
  );
}
