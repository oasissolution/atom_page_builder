
import { writable } from 'svelte/store';
import { EditorViews } from './globalconstants';

/**
* Global variable which holds whole page data as Writable List of Json.
*
* This is set from "+layout.server.js" on page load. Other actions can only update.
* @global
* @example
*  [
*      {
*          "uuid": "AD48A76T5DAS1F4A6SF4A55AS4D35",
*          "type": "text",  // Must be module type
*          "data": { // Module specific data as Json
*              "text": "This is first example text!",
*              ...
*          },
*          "child": {}
*      },
*      {
*          "uuid": "TFH1F86H4GF5H486GY4JHVYJ4G68",
*          "type": "text",  // Must be module type
*          "data": { // Module specific data as Json
*              "text": "This is second example text!",
*              ...
*          },
*          "child": {}
*      },
*  ]
*
* @type {Writable<[{}]>}
*/
export let globalComponentCollectionStore = writable([]);


/**
* Global variable which holds editor preferences as Writable Json.
*
* This is set from "+layout.server.js" on page load. Other actions can only update.
* @global
* @example
* {
*       "menuLocation": "menuLocationTop",
        "widgetPanelDisplayStyle" : "panelDisplayStyleHover",
        "customizePanelDisplayStyle" : "panelDisplayStyleFixedRight",
        "info":"Hover to see info!",
        "editorTheme": {
            "backgroundFrameColor": "#474e6818",
            "backgroundColor": "#404258",
            "editorBackgroundColor": "#ffffff",
            "foregroundColor": "#aaaebe",
            ...
        },
        "editorData": {
            "editorScreen": "screenDesktop",
            "editorWidth": "1120px", 
            "fullWidth": false,
        }
* }
*
* @type {Writable<{}>}
*/
export let globalEditorPreferencesStore = writable({});

/**
* Global variable which holds visibilities of "Menu Panels".
* @global
*
* @type {Writable<{}>}
*/
export let globalVisibilityStore = writable({});

/**
* Global variable which holds content of "Right Panel".
* @global
*
* @type {Writable<[]>}
*/
export let globalRightPanelContentStore = writable([]);

/**
* Global variable which holds content of "Left Panel".
* @global
*
* @type {Writable<[]>}
*/
export let globalLeftPanelContentStore = writable([]);


/**
* Global variable which holds Editor view.
* @global
*
* @type {Writable<String>}
*/
export let globalEditorViewStore = writable(EditorViews.PAGE);


/**
* Global variable which holds selected elements uuid in Editor panel.
* @global
*
* @type {Writable<String>}
*/
export let globalSelectedElementUuidStore = writable("");

/**
* Global variable which holds selected element itself in Editor panel.
* @global
*
* @type {Writable<HTMLElement>}
*/
export let globalSelectedElementStore = writable(null);


/**
* Global variable which holds latter selected element itself in Editor panel.
* @global
*
* @type {Writable<HTMLElement>}
*/
export let globalSelectedLatterElementStore = writable(null);


/**
* Global variable which holds latter selected element itself in Editor panel.
* @global
*
* @property maxZIndex,
* @property minZIndex,
*
* @type {Writable<JSON>}
*/
export let globalSelectedLatterElementDataStore = writable({
    "maxZIndex": 0,
    "minZIndex": 0
});