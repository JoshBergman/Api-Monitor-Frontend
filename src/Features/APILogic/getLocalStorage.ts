import { APIState, API, settings, Headers } from "../APISlice";

//! Add local storage keys here ignore | keys startings with "^" will automatically be ignored
const ignoreKeys = ["DARK"];



export function getLocalStorage():APIState {
    const apiKeys = getAPIKeys(); //returns an array of local-storage API keys ex: ["REST+1, GRAPHQL+2, ..."]

    //if no api-keys are found in storage, return default values
    if (apiKeys.length === 0){
        return defaultValues
    }

    const apiList: APIState = { APIs:[] }; //apiList holds return value

    for(let i = 0; i < apiKeys.length; i++){
        const thisKey = apiKeys[i];
        const thisNum:number = parseInt(thisKey.slice(thisKey.indexOf("+") + 1)); //returns the number label for this API (is encoded in the key) ex: "REST+1"
        const thisType = thisKey.slice(0, thisKey.indexOf('+')); //same theory as above

        //* add settings & body
        const settingsString: string = localStorage.getItem(thisKey) + '';
        const settings:settings = parseSettings(settingsString, thisNum);
        const headers:Headers = parseHeaders(thisNum);

        const thisAPI:API = {
            type: thisType,
            settings: settings,
            headers: headers
        };

        apiList.APIs.push(thisAPI);
    }

    return apiList;
}


//*Looks if headers are stored, if not sets them to {useDefault: true}
const parseHeaders = (thisNum:number) => {
    const response = localStorage.getItem("^^^" + thisNum);
    if(response !== null){
        return JSON.parse(response);
    } else {
        return { useDefault: true };
    }
};


//*unpacks string into object for settings property of API list item
const parseSettings = (settingsString:string, thisNum:number):settings => {
    const markers = [];
    for(let i = 0; i < settingsString.length; i++){
        if (settingsString[i] === "+"){
            markers.push(i);
        }
    }
    
    //settingsString containers format: title+method+endpoint Vehicle 14+GET+https://swapi.dev/api/vehicles/14/
    const thisTitle = settingsString.slice(0, markers[0]);
    const thisMethod = settingsString.slice(markers[0] + 1, markers[1]);
    const thisEndpoint = settingsString.slice(markers[1] + 1);

    const thisSettings:settings = {
        title: thisTitle,
        method: thisMethod,
        endpoint: thisEndpoint,
    };

    //* If a body or query is stored (marked by ^ or ^^) add it to body
    const thisBody = localStorage.getItem("^" + thisNum);
    const thisQuery = localStorage.getItem("^^" + thisNum);
    
    if(thisBody !== null){
        thisSettings.body = JSON.parse(thisBody);
    }
    if(thisQuery !== null){
        thisSettings.body = thisQuery;
    }

    return thisSettings;
};


//*Gets keys of API's from local storage
const getAPIKeys = () => {
    const keys = [];

    for(let i = 0; i < localStorage.length; i++){
        let currKey = localStorage.key(i);

        if(currKey === null || ignoreKeys.includes(currKey) || currKey[0] === "^"){
            continue;
        } else {
            keys.push(currKey);
        }
    }
    return keys;
};


//*default values if nothing is saved
const defaultValues: APIState = {
    APIs: [
        {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/people/1/",
            method: "GET",
            title: "REST Demo (SWAPI)"
        },
        headers: {
            useDefault: true
        }
    },
    {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/vehicles/14/",
            method: "GET",
            title: "Vehicle 14"
        },
        headers: {
            useDefault: true
        }
    },
    {
        type: "GRAPHQL",
        settings: {
            endpoint: "GRAPHQL/OBJ",
            method: "POST",
            title: "GRAPH OBJ",
            body: {value: "twenty", nested: {this: "nested"}}
        },
        headers: {
            useDefault: false,
            "Content-Type": "appliation/json",
            customHeader: "ThisIsTrue!",
            Auth: "be2j0djJSLi3"
        }
    },
    {
        type: "GRAPHQL",
        settings: {
            endpoint: "GRAPHQL/QUERY",
            method: "POST",
            title: "GRAPH QUERY",
            body: "query{user{id,name,job}}"
        },
        headers: {
            useDefault: true
        }
    },
    ]
};