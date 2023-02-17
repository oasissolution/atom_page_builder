import { v4 as uuidv4 } from 'uuid';


/**
 * Editor default preferences
 */
export const editorDefaultPreferences = {
    "menuLocation": "menuLocationTop",
    "widgetPanelDisplayStyle" : "panelDisplayStyleFixedLeft",
    "customizePanelDisplayStyle" : "panelDisplayStyleFixedLeft",
    "optionPanelDisplayStyle" : "panelDisplayStyleFixedRight",
    "info":"Hover to see info!",
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
    "child": {}
}];