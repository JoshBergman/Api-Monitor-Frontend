import { APIState } from "../APISlice";

export function saveToLocalStorage(state:APIState, payload:string | boolean):void {
    localStorage.clear(); // clear storage, set dark mode, then populate with current api's
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
    });
}