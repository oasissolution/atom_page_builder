import { v4 as uuidv4 } from 'uuid';


/**
 * Editor default preferences
 */
export const editorDefaultPreferences = {
    "menuLocation": "menuLocationTop",
    "widgetPanelDisplayStyle" : "panelDisplayStyleFixedLeft",
    "customizePanelDisplayStyle" : "panelDisplayStyleFixedLeft",
    "optionPanelDisplayStyle" : "panelDisplayStyleFixedRight",
    "layerPanelDisplayStyle" : "panelDisplayStyleFixedRight",
    "info":"Hover to see info!",
    "build":"dev", //release - dev
    "editorTheme": {
        "backgroundFrameColor": "#474e6818",
        "backgroundColor": "#404258",
        "editorBackgroundColor": "#ffffff",
        "foregroundColor": "#aaaebe",
        "buttonActiveBackgroundColor": "#262733",
        "buttonPassiveBackgroundColor": "transparent",
        "buttonActiveForegroundColor": "#aaaebe",
        "buttonPassiveForegroundColor": "#aaaebe",
        "fixedPanelForegroundColor": "#aaaebe",
        "fixedPanelBackgroundColor": "#262733",
        "fixedPanelButtonActiveBackgroundColor": "#404258",
        "fixedPanelButtonPassiveBackgroundColor": "transparent",
        "fixedPanelButtonActiveForegroundColor": "#aaaebe",
        "fixedPanelButtonPassiveForegroundColor": "#aaaebe",
        "editorMouseOverColor":"#404258",
    },
    "editorData": {
        "editorScreen": "screenDesktop",
        "editorWidth": "1320px",
        "fullWidth": false,
    }
};


/**
 * Default startup data for editor.
 */
export let editorBlankData =  [{
    "uuid": uuidv4().toString(),
    "type": "body",
    "data": { 
        "text": "Drag & Drop to start!",
    },
    "children": [
        {
            "uuid": uuidv4().toString(),
            "type": "div",
            "data": { 
                "class":"text-2xl h-[100px] bg-teal-800 flex place-content-center items-center",
                "text": "Div test 1",
            },
            "children": [
                {
                    "uuid": uuidv4().toString(),
                    "type": "div",
                    "data": { 
                        "class":"flex place-content-center bg-teal-600 w-[600px] h-[75px] items-center",
                        "text": "Div test 3",
                    },
                    "children": [
                        {
                            "uuid": uuidv4().toString(),
                            "type": "text",
                            "data": { 
                                "class":"flex place-content-center text-lg",
                                "text": "Div test 4",
                            },
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "uuid": uuidv4().toString(),
            "type": "div",
            "data": { 
                "class":"place-content-center bg-teal-600 w-[300px]",
                "text": "Div test 2",
            },
            "children": []
        }
    ]
}];


// export let editorBlankData =  [{
//     "uuid": uuidv4().toString(),
//     "type": "body",
//     "data": { 
//         "text": "Drag & Drop to start!",
//     },
//     "children": []
// }];