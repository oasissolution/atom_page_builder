<script>
	import { onMount, onDestroy } from 'svelte';
	import Iconbutton from '../../uicomponents/iconbutton.svelte';
	import {
		getDataFromComponent,
		updateGlobalComponentCollectionStore,
		getComponent
	} from '../../globals/globalfunctions.js';
	import {
		globalComponentCollectionStore,
		globalEditorPreferencesStore
	} from '../../globals/globalstores';
	import { globalSelectedElementUuidStore } from '../../globals/selectorstores';
	import { writable } from 'svelte/store';
	import {
		sendSelectedElement,
		openOptionsPanel,
		createDroppedElementInside,
		replaceDroppedElementInside,
		createDroppedElementBefore,
		replaceDroppedElementBefore,
		createDroppedElementAfter,
		replaceDroppedElementAfter
	} from '../../(shared)/shared/sharedfunctions.js';

	let globalComponentCollection = $globalComponentCollectionStore;
	$: globalComponentCollectionStore.set(globalComponentCollection);

	/**
	 * @type HTMLElement
	 */
	let bindElement;

	/**
	 * @type string
	 */
	export let uuid;

	/**
	 * @type boolean
	 */
	export let selected;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function clickFunction() {
		dispatch('click');
	}

	let loaded = false;
	let hidden = false;

	onMount(() => {
		bindElement.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', uuid);
		});

		bindElement.addEventListener('click', (event) => {
			clickFunction();
		});

		bindElement.addEventListener('drop', dropped);
		bindElement.addEventListener('dragenter', cancelDefault);
		bindElement.addEventListener('dragover', dragOver);
		bindElement.addEventListener('dragleave', dragLeave);
		// bindElement.addEventListener('dragend', dragEnd);

		loadElementData();

		loaded = true;
	});

	onDestroy(() => {
		bindElement.removeEventListener('drop', dropped);
		bindElement.removeEventListener('dragenter', cancelDefault);
		bindElement.removeEventListener('dragover', dragOver);
		bindElement.removeEventListener('dragleave', dragLeave);
		// bindElement.removeEventListener('dragend', dragEnd);
	});

	/**
	 * Required data to fill attributes of HTML elements
	 * @typedef {Object} AttrData
	 * @property {string} [accesskey] - Specifies a shortcut key to activate the element
	 * @property {string} [class] - Specifies one or more class names for the element (used to reference the element in CSS)
	 * @property {string} [contenteditable] - Specifies whether the content of the element can be edited by the user
	 * @property {string} [dir] - Specifies the direction of the element's text (left-to-right or right-to-left)
	 * @property {string} [draggable] - Specifies whether the element is draggable
	 * @property {boolean} [hidden] - Specifies that the element should be hidden
	 * @property {string} [id] - Specifies a unique id for the element (used to reference the element in JavaScript)
	 * @property {string} [lang] - Specifies the language of the element's content
	 * @property {boolean} [spellcheck] - Specifies whether the element should have its spelling and grammar checked
	 * @property {string} [style] - Specifies inline CSS for the element
	 * @property {number} [tabindex] - Specifies the tab order of the element
	 * @property {string} [title] - Specifies extra information about the element (displayed as a tooltip)
	 * @property {string} [text] - Value of Text Element
	 */

	/**
	 * Data of Atom Element
	 * @typedef {Object} ElementData
	 * @property {string} [uuid] - Unique id of element.
	 * @property {string} [type] - Type of element
	 * @property {boolean} [selected] - Specifies whether the element is selected.
	 * @property {AttrData} [data] - Element specific data.
	 * @property {Array<JSON>} [children] - Child elements.
	 */

	/**
	 * All data of element
	 * @type {ElementData | null}
	 */
	let activeElement;

	/**
	 * Used for sub elements to update themselves to current values.
	 * @type string
	 */
	let elementDataLoaded = '';

	/**
	 *
	 */
	let classInput = '';

	/**
	 * Loads element data from JSON
	 */
	function loadElementData() {
		activeElement = getComponent(globalComponentCollection, uuid);

		classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : '';

		elementDataLoaded = classInput;

		// leadingOfText.set(activeElement?.data.text.toString().substring(0,18) + "...");
	}

	/**
	 * Update Editor Panel
	 */
	function updateEditor() {
		const data = {
			message: {
				componentCollection: $globalComponentCollectionStore,
				editorPreferences: $globalEditorPreferencesStore
			}
		};

		var elm = document.getElementById('editorFrame');
		if (elm != null) if (elm.contentWindow != null) elm.contentWindow.postMessage(data, '*');
	}

	function updateClass() {
		if (activeElement) {
			if (activeElement.data) {
				activeElement.data.class = classInput;
				updateEditor();
			}
		}
	}

	/**
	 * @type Writable<string>
	 */
	let leadingOfText = writable('');

	leadingOfText.set(getText());

	function getText() {
		return (
			getDataFromComponent($globalComponentCollectionStore, uuid, 'text')
				.toString()
				.substring(0, 18) + '...'
		);
	}

	$: $globalComponentCollectionStore,
		(() => {
			leadingOfText.set(getText());
			// leadingOfText.set(activeElement?.data.text.toString().substring(0,18) + "...");
		})();

	function toggleVisibility() {
		if (loaded == true) {
			var newClass = '';
			var found = false;

			classInput.split(' ').forEach((cls) => {
				if (cls.trim() == 'hidden') {
					found = true;
				} else {
					newClass += ' ' + cls.trim();
				}
			});

			if (found) {
				classInput = newClass.trim() + ' ';
				hidden = false;
			} else {
				classInput = newClass.trim() + ' hidden';
				hidden = true;
			}
			updateClass();

			// console.log("classInput : " + classInput);
		}
	}

	/**
	 * if mouse is in a area of "dropAreaLimit" px from left then drop before else drop after
	 *
	 * This variable holds what to do!
	 * @type Writable<boolean>
	 */
	let droppedBefore = writable(true);

	/**
	 * This width is from left side of element. If mouse is in this limit then this means new dropped item will be before this element.
	 * Otherwise element will be dropped inside.
	 */
	const dropAreaLimit = 50;

	function dropped(e) {
		const types = e.dataTransfer.types;
		// execute function only when target container is different from source container
		if (bindElement.id !== e.target.id || types.includes('text/plain') === true) {
			cancelDefault(e);

			bindElement.classList.remove('outline-dashed');
			bindElement.classList.remove('outline-2');
			bindElement.classList.remove('outline-offset-2');
			bindElement.classList.remove('outline-teal-500');
			bindElement.classList.remove('border-t-4');
			bindElement.classList.remove('border-b-4');
			bindElement.classList.remove('border-teal-500');

			var typeOfTransfer = e.dataTransfer.getData('text/plain');
			if (!typeOfTransfer.toString().includes('element-')) {
				/// Comes from inside of editor

				/// if mouse is in center then drop element inside.
				/// if mouse is in a area of 30 px from left then drop before.
				/// if mouse is in a area of 30 px from right then drop after.
				if (typeOfTransfer.toString() !== uuid) {
					if ($droppedBefore === true) {
						/// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
						replaceDroppedElementBefore(typeOfTransfer.toString(), uuid);
					} else {
						/// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
						replaceDroppedElementAfter(typeOfTransfer.toString(), uuid);
					}
					// updateEditor();
					// globalSelectedElementUuidStore.set(uuid);
					updateClass();
				}
			} else {
				///Comes from widgets panel

				if ($droppedBefore === true) {
					/// in this function typeOfTransfer is element type to create e.g. element-div, element-text, ...
					createDroppedElementBefore(uuid, typeOfTransfer);
				} else {
					/// in this function typeOfTransfer is element type to create e.g. element-div, element-text, ...
					createDroppedElementAfter(uuid, typeOfTransfer);
				}

				// updateEditor();
				// globalSelectedElementUuidStore.set(uuid);
				updateClass();
			}
		}
	}

	function dragOver(e) {
		cancelDefault(e);

		const types = e.dataTransfer.types;
		if (types.includes('text/plain')) {
			// && e.dataTransfer.getData('text/plain') === 'div'

			const rect = bindElement.getBoundingClientRect();

			if (
				rect.left <= e.pageX &&
				e.pageX <= rect.left + dropAreaLimit &&
				rect.top <= e.pageY &&
				e.pageY <= rect.top + rect.height
			) {
				droppedBefore.set(true);
			} else if (
				rect.right >= e.pageX &&
				e.pageX >= rect.right - dropAreaLimit &&
				rect.top <= e.pageY &&
				e.pageY <= rect.top + rect.height
			) {
				droppedBefore.set(false);
			}

			/// if mouse is in center then drop element inside.
			/// if mouse is in a area of 30 px from left then drop before.
			/// if mouse is in a area of 30 px from right then drop after.

			if ($droppedBefore == true) {
				bindElement.classList.add('border-t-4');
				bindElement.classList.remove('border-b-4');
			} else {
				bindElement.classList.add('border-b-4');
				bindElement.classList.remove('border-t-4');
			}
			bindElement.classList.add('border-violet-500');
			bindElement.classList.remove('outline-dashed');
			bindElement.classList.remove('outline-2');
			bindElement.classList.remove('outline-offset-2');
			bindElement.classList.remove('outline-violet-500');
		}
	}

	function dragLeave(e) {
		bindElement.classList.remove('outline-dashed');
		bindElement.classList.remove('outline-2');
		bindElement.classList.remove('outline-offset-2');
		bindElement.classList.remove('outline-violet-500');

		bindElement.classList.remove('border-t-4');
		bindElement.classList.remove('border-b-4');
		bindElement.classList.remove('border-violet-500');
	}

	function dragEnd(e) {
		e.dataTransfer.clearData();
	}

	function cancelDefault(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
</script>

<div
	class="w-full flex flex-row justify-between items-center rounded h-8"
	draggable="true"
	bind:this={bindElement}
	class:text-[#696AC6]={selected}
	class:bg-[#696AC626]={selected}
>
	<div class="flex flex-row gap-2 pl-2">
		<div class="w-4 h-4">
			<i class="bi bi-fonts" />
		</div>
		<div class="">
			<span>Text</span>
			<!-- <span class="italic text-[10px] ml-1">{$leadingOfText}</span> -->
		</div>
	</div>
	{#if selected == true}
		<div class="flex flex-row justify-end gap-2">
			<Iconbutton active={false} noBackground on:click={toggleVisibility}>
				<span slot="icon" class="text-[#696AC6]">
					{#if hidden == false}<i class="bi bi-eye" />{:else}<i class="bi bi-eye-slash" />{/if}
				</span>
			</Iconbutton>
		</div>
	{:else if selected == false && hidden == true}
		<div class="flex flex-row justify-end gap-2">
			<Iconbutton active={false} noBackground on:click={toggleVisibility}>
				<span slot="icon" class="text-[#696AC6]">
					<i class="bi bi-eye-slash" />
				</span>
			</Iconbutton>
		</div>
	{/if}
</div>
