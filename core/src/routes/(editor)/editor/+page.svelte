<script>
	import '../../../app.css';
	import { onMount } from 'svelte';
	import {
		globalEditorPreferencesStore,
		globalComponentCollectionStore,
		globalThemeStore
	} from '../../globals/globalstores.js';
	import { globalSelectedElementStore } from '../../globals/selectorstores.js';
	import { getComponent } from '../../globals/globalfunctions.js';
	import {
		sendDeletedElement,
		refreshEditorData,
		sendEditorInnerHTML,
		closeOptionsPanel
	} from '../../(shared)/shared/sharedfunctions.js';
	import Editortree from './editortree.svelte';
	import Selector from '../../(shared)/shared/selector.svelte';
	import swal from 'sweetalert';

	/// ATTENTION !

	/// Editor panel runs in an iframe. Hence, defined stores here are different than main stores in runtime, even if their names and definitions are identical.
	/// You may think this as, same stores running in two different threads with different values.

	let globalEditorPreferences = $globalEditorPreferencesStore;
	$: globalEditorPreferencesStore.set(globalEditorPreferences);

	let globalComponentCollection = $globalComponentCollectionStore;
	$: globalComponentCollectionStore.set(globalComponentCollection);

	let globalTheme = $globalThemeStore;
	$: globalThemeStore.set(globalTheme);

	let loaded = false;
	$: $globalEditorPreferencesStore.theme,
		(() => {
			if (loaded == true) {
				const link = window.document.querySelector('#theme-link');
				var themeFile =
					$globalEditorPreferencesStore.theme !== undefined
						? $globalEditorPreferencesStore.theme
						: 'dark';
				if (link) {
					link.href = '/themes/' + themeFile + '.css';
				} else {
					const newLink = document.createElement('link');
					newLink.id = 'theme-link';
					newLink.rel = 'stylesheet';
					newLink.href = '/themes/' + themeFile + '.css';
					window.document.head.appendChild(newLink);
				}
			}
		})();

	// TODO: import all modules dynamically

	import Body from '../../(modules)/modules/body.svelte';
	import Div from '../../(modules)/modules/div.svelte';
	import Text from '../../(modules)/modules/text.svelte';
	import GridContainer from '../../(modules)/modules/grid-container.svelte';
	import EasySection from '../../(modules)/modules/easy-section.svelte';
	import Image from '../../(modules)/modules/img.svelte';
	import Section from '../../(modules)/modules/section.svelte';
	import Block from '../../(modules)/modules/block.svelte';

	/**
	 * Definition and list of all modules in a JSON.
	 * @returns {JSON}
	 *
	 */
	const JsonOfModules = {
		body: Body,
		div: Div,
		text: Text,
		gridcontainer: GridContainer,
		easysection: EasySection,
		img: Image,
		section: Section,
		block: Block
	};

	/**
	 * Definition and list of all modules in a JSON.
	 * @returns {JSON}
	 *
	 */
	const JsonOfTypes = {
		body: { title: 'Body', data: '' },
		div: { title: 'Container', data: '' },
		text: { title: 'Text', data: 'text' },
		gridcontainer: { title: 'Grid Container', data: '' },
		easysection: { title: 'Easy Section', data: '' },
		img: { title: 'Image', data: '' },
		section: { title: 'Section', data: '' },
		block: { title: 'Block', data: '' }
	};

	onMount(() => {
		// Listen for messages from the outer page
		window.addEventListener('message', (event) => {
			// Check that the message is from a trusted source
			if (event.origin !== window.location.origin) {
				return;
			}
			// Get the data from the message
			const data = event.data.message;

			if (data === undefined) {
				// console.log("Incoming data do not have message!");
				setTimeout(refreshEditorData, 200);
				// refreshEditorData();
			} else {
				/// Set data as global writables
				globalComponentCollection = data.componentCollection;
				globalEditorPreferences = data.editorPreferences;
				globalTheme = data.globalTheme;
				sendEditorInnerHTML();
			}
		});

		window.addEventListener('keydown', (e) => {
			if (e.key === 'Delete' && $globalSelectedElementStore !== null) {
				const comp = getComponent($globalComponentCollectionStore, $globalSelectedElementStore.id);

				if (comp.type != 'body') {
					swal({
						title: 'Delete "' + JsonOfTypes[comp.type].title + '" ?',
						text:
							JsonOfTypes[comp.type].data != '' ? comp.data[JsonOfTypes[comp.type].data] ?? '' : '',
						icon: 'warning',
						buttons: ['No, keep it', 'Yes, DELETE'],
						dangerMode: true
					}).then((willDelete) => {
						if (willDelete) {
							sendDeletedElement(comp.uuid);
							closeOptionsPanel();
							swal('Element deleted', {
								icon: 'success'
							});
						} else {
							swal('Element kept!', { icon: 'info' });
						}
					});
				}
			}
		});

		window.addEventListener('error', (e) => {
			swal({
				title: 'Error on Editor Panel',
				text: e.error.toString(),
				icon: 'error'
			});
		});

		loaded = true;
	});
</script>

<div id="editorInnerPanel">
	{#if $globalComponentCollectionStore}
		{#each $globalComponentCollectionStore as component}
			<svelte:component
				this={JsonOfModules[component.type]}
				data={component.data}
				uuid={component.uuid}
				selected={component.selected}
				childs={component.children}
			>
				<Editortree {component} {JsonOfModules} />
			</svelte:component>
		{/each}
	{:else}
		<div class="w-[100vw] h-[100vh] flex justify-center align-middle content-center text-2x">
			<span>Loading...</span>
		</div>
	{/if}
</div>
<!-- editorInnerPanel -->

<svelte:component this={Selector} />

<style>
	#editorInnerPanel {
		width: 100%;
		height: 100vh; /* subject to change in following versions */
	}
</style>
