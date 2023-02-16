
import { writable } from 'svelte/store';

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