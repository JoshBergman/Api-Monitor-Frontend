import { APIState } from "../APISlice";

export function saveToLocalStorage(state:APIState, payload:string | boolean):void { 
    // clear storage, set dark mode, then populate with current api's
    clearLocalStorageAndSaveSID();
    localStorage.setItem("DARK", '' + payload);
    
    let i = 0;
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
        if(api.headers){
            if(api.headers["useDefault"] !== true){
                localStorage.setItem("^^^" + i, JSON.stringify(api.headers));
            }
        }
    });
}

const clearLocalStorageAndSaveSID = () => {
    const sidVal = localStorage.getItem("SID");
    localStorage.clear();

    if(sidVal !== null){
        localStorage.setItem("SID", sidVal);
    }
};