import React from 'react';

import { unnestObject } from '../../Helpers/Unnester';

export default function HeadersDisplay({headers}:any) {
  let useDefault;
  try {
  useDefault = headers.headers.useDefault;
  } catch (err) {
  useDefault = true;
  }

  return (
    <React.Fragment>
    {useDefault &&
    <li>Headers: 
        <ul>
            <li>Content-Type: application/json</li>
        </ul>
    </li>
    }
    {!useDefault &&
      <li>Headers: <ul>{unnestObject(headers.headers)}</ul></li>
    }
    </React.Fragment>
  );
}
