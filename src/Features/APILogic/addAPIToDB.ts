import settings from '../../App/Backend';
import { API } from '../APISlice';

export const addAPIToDB = async (sid:string | undefined, newAPI:API) => {
    if(sid === '' || sid === undefined){ return; }

    const addAPIResponse = await fetch(settings.url + "/list/new/" + sid,{
        method: "Put",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(newAPI)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.error(err);
    });
};

export const rmAPIFromDB = async (sid:string | undefined, deleteTitle:string) => {
    console.log("Triggered del", sid, deleteTitle)
    if(sid === '' || sid === undefined){ return; }
    console.log(deleteTitle);

    const rmAPIFromDB = await fetch(settings.url + "/list/delete/" + sid,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            title: deleteTitle
        })
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.error(err);
    });
};