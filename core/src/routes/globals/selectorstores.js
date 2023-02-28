import { writable } from 'svelte/store';

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