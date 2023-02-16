import { editorDefaultPreferences } from "./globals/defaults.js";

const pageDemoData = [{
    "uuid": "AD48A76T5DAS1F4A6SF4A55AS4D35",
    "type": "text",  // Must be module type
    "data": { // Module specific data as Json
        "text": "This is first example text!",
    },
    "child": {}
},
{
    "uuid": "TFH1F86H4GF5H486GY4JHVYJ4G68",
    "type": "text",  // Must be module type
    "data": { // Module specific data as Json
        "text": "This is second example text!",
    },
    "child": {}
},
];


/**
 * 
 * @param {*} params 
 * @returns 
 */
export function load({params}){
    return {
        pageData: pageDemoData,
        editorPreferences : editorDefaultPreferences,
    };
}


