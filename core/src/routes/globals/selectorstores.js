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
 * @typedef {Object} ExpansionState
 * @property {string} [uuid] - Unique id of element.
 * @property {boolean} [state] - Specifies whether the element is expanded.
 */

/**
* Global variable which holds states of expansions of layers.
* @global
*
* @type {Writable<ExpansionState>}
*/
export let globalLayersExpansionStatesStore = writable({});