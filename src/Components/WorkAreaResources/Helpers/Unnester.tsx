//recursive function to render the nested object nature of the API response body

export function unnestObject (obj:any) {
    const currList = [];
    let i = 0;
    for(let key in obj) {
        //if a nested object push key and then make new <ul> as a <li> to indicate the nestedness
        if (typeof obj[key] === "object"){
            i++;
            currList.push(<li key={"a" + i}>{key + ": "} <ul key={i}>{unnestObject(obj[key])}</ul> </li>);
        
        } else {
        //if not a nested object push curr value
        i++;
        currList.push(<li key={i}>{[key + ":", " " + obj[key]]}</li>);
        }
}
    return currList;
}