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


