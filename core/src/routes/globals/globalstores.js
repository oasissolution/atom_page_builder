
import { writable } from 'svelte/store';
import { EditorViews } from './globalconstants';

/**
* Global variable which holds whole page data as Writable List of Json.
*
* This is set from "+layout.server.js" on page load. Other actions can only update.
* @global
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
* Global variable which holds content of "Left Panel".
* @global
*
* @type {Writable<[]>}
*/
export let globalFloatingPanelContentStore = writable([]);


/**
* Global variable which holds Editor view.
* @global
*
* @type {Writable<String>}
*/
export let globalEditorViewStore = writable(EditorViews.PAGE);


/**
* Global variable which holds theme of Atom.
* @global
*
* @type {Writable<JSON>}
*/
export let globalThemeStore = writable();


/**
* Global variable which holds active hover button
* @global
*
* @type {Writable<HTMLElement>}
*/
export let globalHoverButton = writable();