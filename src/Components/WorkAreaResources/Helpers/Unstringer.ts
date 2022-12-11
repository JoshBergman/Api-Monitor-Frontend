//parses string into an object using proper types

export const unStringObject = (str:any) => {
    let currItem = '';
    let currKey = '';
    let currValue = '';
    let wasObj = false;

    const thisObj: any = {};
    for(let i = 1; i < str.length; i++){
        if(str[i] === ':'){
            currKey = currItem.trim();
            currItem = '';
        }
        else if(str[i] === ","){
            if(wasObj){
            wasObj = false;
            } else {
            currValue = currItem.trim();
            currItem = '';
            
            thisObj[currKey] = findBoolean(currValue);
        }
        }
        else if(str[i] === '{'){
            while(str[i] !== '}' && i < str.length){
                currItem += str[i];
                i++;
            }
            currItem += str[i];
            currItem = unStringObject(currItem.trim());
            thisObj[currKey] = findBoolean(currItem);
            currItem = '';
            wasObj = true;
            i++;
        }
        else if(str[i] === '}'){
            if(wasObj){

            } else{
            thisObj[currKey] = findBoolean(currItem.trim()); }
        }
        else {
            currItem += str[i];
        }
    }
    return thisObj;
};

const findBoolean = (string:string) => {
    if(string === "false"){
        return false;
    } else if (string === "true"){
        return true;
    } else if( !Number.isNaN(parseInt(string))){
        return parseInt(string);
    } else {
        return string;
    }
};