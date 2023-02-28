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
                "class":"text-2xl bg-teal-800 flex flex-col content-center align-center items-center py-3",
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
                },
                {
                    "uuid": uuidv4().toString(),
                    "type": "div",
                    "data": { 
                        "class":"flex place-content-center bg-teal-600 w-[600px] h-[75px] items-center mt-3",
                        "text": "Div test 7",
                    },
                    "children": [
                        {
                            "uuid": uuidv4().toString(),
                            "type": "text",
                            "data": { 
                                "class":"flex place-content-center text-lg",
                                "text": "Div test 6",
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
                "class":"place-content-center absolute top-[25px] right-[25px] bg-sky-600 w-[400px] h-[250px]",
                "text": "Div test 2",
            },
            "children": [
                {
                    "uuid": uuidv4().toString(),
                    "type": "text",
                    "data": { 
                        "class":"flex place-content-center text-lg mt-2 z-20",
                        "text": "Div test 5",
                    },
                    "children": []
                }
            ]
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