import { createSlice } from '@reduxjs/toolkit';

export interface API {
    type: string;
        settings: {
            endpoint: string;
            method: string;
            title: string;
            body?: string | object;
        }
}

interface APIState {
    APIs: API[]
}

//function to go through local storage string for API's and break it down into array (Helper function to getFromStorage())
const parseSettings = (currString: string, currNum: string) => {
    const currSettings = []; //title, method, endpoint, body?
    const markers = [];

    for(let i = 0; i < currString.length; i++){
        if (currString[i] === "+"){
            markers.push(i);
        }
    }
    currSettings.push(currString.slice(0, markers[0]));
    currSettings.push(currString.slice(markers[0] + 1, markers[1]));
    currSettings.push(currString.slice(markers[1] + 1));

    //push body if contained
    const currBody = localStorage.getItem("^" + currNum);
    if(currBody !== null){
        currSettings.push(JSON.parse(currBody));
    }
    //push query if contained
    const currQuery = localStorage.getItem("^^" + currNum);
    if(currQuery !== null){
        currSettings.push(currQuery);
    }
    
    return currSettings;
};

//goes through local storage keys and returns stored API's as proper APIState objects.
//if only dark mode is stored in local storage it will return defualt values
const getFromStorage = () => {
    const keys = [];
    let searching = true;
    let i = 0;

    //populate keys:
    while(searching) {
        const currKey = localStorage.key(i);
        if(currKey) {
            if(currKey === "DARK" || currKey[0] === "^"){
            } else {
                keys.push(currKey);
            }
        } else {
            searching = false;
        }
        i++;
    }    
    if(keys.length === 0){
        return defaultValues;
    }

    //build objects and push to currAPIS
    const currAPIS:APIState = {APIs: []};
    keys.forEach((currKey) => {
        let currString: string | null = localStorage.getItem(currKey);
        if (currString === null){return}
        const thisNum = currKey.slice(currKey.indexOf("+") + 1);
        const currSettings = parseSettings(currString, thisNum); //returns [title, method, endpoint]
        const thisAPI: API = {
            type: currKey.slice(0, currKey.indexOf('+')),
            settings: {
                endpoint: currSettings[2],
                title: currSettings[0],
                method: currSettings[1]
            }
            }
        //if a body was included then add the body
        if (currSettings.length > 3) {
            thisAPI.settings.body = currSettings[3];
        }
        currAPIS["APIs"].push(thisAPI);
    });
    return currAPIS;
};

const defaultValues: APIState = {
    APIs: [
        {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/people/1/",
            method: "GET",
            title: "REST Demo (SWAPI)"
        }
    },
    {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/vehicles/14/",
            method: "GET",
            title: "Vehicle 14"
        }
    },
    {
        type: "GRAPHQL",
        settings: {
            endpoint: "GRAPHQL/OBJ",
            method: "POST",
            title: "GRAPH OBJ",
            body: {value: "twenty", nested: {this: "nested"}}
        }
    },
    {
        type: "GRAPHQL",
        settings: {
            endpoint: "GRAPHQL/QUERY",
            method: "POST",
            title: "GRAPH QUERY",
            body: "query{user{id,name,job}}"
        }
    },
    ]
};

const initialState: APIState = getFromStorage();

export const APISlice = createSlice({
    name: "style",
    initialState: initialState,
    reducers: {
        addNewAPI: (state, action) => {
            state.APIs.push(action.payload); //payload must be a APIState object
        },
        delAPI: (state, action) => {
            state.APIs = (
            state.APIs.filter((currAPI) => {
                if(action.payload === currAPI.settings.title){
                    return false;
                } else {
                    return true;
                }
            }));
        },
        saveLocalStorage: (state, action) => {
            localStorage.clear(); // clear storage, set dark mode, then populate with current api's
            localStorage.setItem("DARK", '' + action.payload);
            let i = 0;
            state.APIs.forEach((api) => {console.log(api.settings)}); //DEBUGG
            state.APIs.forEach((api) => {
                i++;
                const apiKeyString =  api.settings.title + '+' + api.settings.method + '+' + api.settings.endpoint;
                localStorage.setItem(api.type + '+' + i, apiKeyString);

                if(api.settings.body){
                    if(api.type === "REST" || typeof api.settings.body === 'object'){
                        localStorage.setItem("^" + i, JSON.stringify(api.settings.body));
                    }
                    else if (api.type === "GRAPHQL" && typeof api.settings.body === "string"){
                        localStorage.setItem('^^' + i, "" + api.settings.body);
                    }
                }
            });
        },
    },
});

export const { delAPI, addNewAPI, saveLocalStorage } = APISlice.actions //export actions

export default APISlice.reducer;