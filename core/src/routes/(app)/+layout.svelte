<script>
	import '../../app.css';
	import { onMount, onDestroy, SvelteComponent } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		globalComponentCollectionStore,
		globalEditorPreferencesStore,
		globalRightPanelContentStore,
		globalLeftPanelContentStore,
		globalFloatingPanelContentStore,
		globalVisibilityStore,
		globalEditorViewStore,
		globalThemeStore
	} from '../globals/globalstores.js';
	import { PanelDisplayStyles, MenuLocations } from '../globals/globalconstants.js';
	import { editorDefaultPreferences, editorBlankData } from '../globals/defaults.js';
	import Menu from '../menu/menu.svelte';
	import Customize from '../menu/customize/page.svelte';
	import Widgets from '../menu/widgets/page.svelte';
	import Options from '../menu/options/page.svelte';
	import Layers from '../menu/layers/page.svelte';

	import { loadVariables } from '../loadvariables.svelte';

	export const prerender = true;

	/// Attach all data from database to this app.
	//TODO: fetch data from WP with rest Api
	globalComponentCollectionStore.set(editorBlankData);
	globalEditorPreferencesStore.set(editorDefaultPreferences);

	import { themeColors as DarkTheme } from '../themes/dark.js';
	import modal from '../uicomponents/modal.svelte';
	globalThemeStore.set(DarkTheme);

	/// Load all variables dynamically, especially visibility options
	loadVariables();

	///Load all panels in layout

	/**
	 * Variable which holds "Right Panel Contents".
	 *
	 * @type [{}]
	 */
	let rightPanelContentStore = [{}];
	/// Updates "globalRightPanelContentStore" whenever variable "rightPanelContentStore" changes.
	$: globalRightPanelContentStore.set(rightPanelContentStore);

	/**
	 * Variable which holds "Left Panel Contents".
	 *
	 * @type [{}]
	 */
	let leftPanelContentStore = [{}];
	/// Updates "globalLeftPanelContentStore" whenever variable "leftPanelContentStore" changes.
	$: globalLeftPanelContentStore.set(leftPanelContentStore);

	/**
	 * Variable which holds "Floating Panel Contents".
	 *
	 * @type [{}]
	 */
	let floatingPanelContentStore = [{}];
	/// Updates "globalLeftPanelContentStore" whenever variable "leftPanelContentStore" changes.
	$: globalFloatingPanelContentStore.set(floatingPanelContentStore);

	/// Manually add all components to panels.

	/// There must be no empty entries in the list. So started adding components like this. To add new panels use .push() !
	/// "name" and "ds" (short for display style) parameters are used in background to help development and debugging
	rightPanelContentStore = [
		{ component: Customize, name: 'Customize', ds: 'customizePanelDisplayStyle' }
	];
	leftPanelContentStore = [
		{ component: Customize, name: 'Customize', ds: 'customizePanelDisplayStyle' }
	];
	floatingPanelContentStore = [
		{ component: Customize, name: 'Customize', ds: 'customizePanelDisplayStyle' }
	];

	rightPanelContentStore.push({
		component: Widgets,
		name: 'Widgets',
		ds: 'widgetPanelDisplayStyle'
	});
	leftPanelContentStore.push({
		component: Widgets,
		name: 'Widgets',
		ds: 'widgetPanelDisplayStyle'
	});
	floatingPanelContentStore.push({
		component: Widgets,
		name: 'Widgets',
		ds: 'widgetPanelDisplayStyle'
	});

	rightPanelContentStore.push({
		component: Options,
		name: 'Options',
		ds: 'optionPanelDisplayStyle'
	});
	leftPanelContentStore.push({
		component: Options,
		name: 'Options',
		ds: 'optionPanelDisplayStyle'
	});
	floatingPanelContentStore.push({
		component: Options,
		name: 'Options',
		ds: 'optionPanelDisplayStyle'
	});

	rightPanelContentStore.push({ component: Layers, name: 'Layers', ds: 'layerPanelDisplayStyle' });
	leftPanelContentStore.push({ component: Layers, name: 'Layers', ds: 'layerPanelDisplayStyle' });
	floatingPanelContentStore.push({
		component: Layers,
		name: 'Layers',
		ds: 'layerPanelDisplayStyle'
	});

	let topMenuFrameContent = false;
	let bottomMenuFrameContent = false;
	let leftMenuFrameContent = false;
	let rightMenuFrameContent = false;

	$: switch ($globalEditorPreferencesStore.menuLocation) {
		case MenuLocations.TOP:
			topMenuFrameContent = true;
			bottomMenuFrameContent = false;
			leftMenuFrameContent = false;
			rightMenuFrameContent = false;
			break;
		case MenuLocations.BOTTOM:
			topMenuFrameContent = false;
			bottomMenuFrameContent = true;
			leftMenuFrameContent = false;
			rightMenuFrameContent = false;
			break;
		case MenuLocations.LEFT:
			topMenuFrameContent = false;
			bottomMenuFrameContent = false;
			leftMenuFrameContent = true;
			rightMenuFrameContent = false;
			break;
		case MenuLocations.RIGHT:
			topMenuFrameContent = false;
			bottomMenuFrameContent = false;
			leftMenuFrameContent = false;
			rightMenuFrameContent = true;
			break;
		default:
			break;
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
	/>
	<title>Atom Page Builder</title>
	<script src="tailwind3.3.1.js"></script>
</svelte:head>

<div
	id="backgroundFrame"
	class=""
	style="
--backgroundFrameColor:{$globalThemeStore.mainLayout.backgroundFrameColor};
--theme: {$globalEditorPreferencesStore.theme}
"
>
	{#if topMenuFrameContent}<div id="topMenuFrame" class="fixed top-0 left-0 right-0">
			<svelte:component this={Menu} />
		</div>{/if}
	<div id="middleFrame" class="flex flex-row">
		{#if leftMenuFrameContent}<div id="leftMenuFrame" class="">
				<svelte:component this={Menu} />
			</div>{/if}

		{#if $globalLeftPanelContentStore.length > 0}<div
				id="leftPanelFrame"
				class=""
				transition:fly={{ x: -320, duration: 700 }}
			>
				{#each $globalLeftPanelContentStore as item}
					{#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDLEFT}
						<svelte:component this={item.component} />
					{/if}
				{/each}
			</div>{/if}

		<div id="editorWrapper" class="w-full">
			<div
				id="editor"
				style="
                --editorBackgroundColor:{$globalThemeStore.mainLayout.editorBackgroundColor};
                --backgroundColor:{$globalThemeStore.mainLayout.backgroundColor};
                --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
                "
			>
				<slot />
			</div>
		</div>

		<svelte:component this={modal} />

		{#if $globalRightPanelContentStore.length > 0}<div
				id="rightPanelFrame"
				class=""
				transition:fly={{ x: 320, duration: 700 }}
			>
				{#each $globalRightPanelContentStore as item}
					{#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDRIGHT}
						<svelte:component this={item.component} />
					{/if}
				{/each}
			</div>{/if}

		{#if rightMenuFrameContent}<div id="rightMenuFrame" class="">
				<svelte:component this={Menu} />
			</div>{/if}
	</div>
	{#if bottomMenuFrameContent}<div id="bottomMenuFrame" class="fixed bottom-0 left-0 right-0">
			<svelte:component this={Menu} />
		</div>{/if}
</div>

{#if $globalRightPanelContentStore.length > 0}
	{#each $globalRightPanelContentStore as item}
		{#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FLOAT}
			<svelte:component this={item.component} />
		{/if}
	{/each}
{/if}

{#if $globalRightPanelContentStore.length > 0}
	{#each $globalRightPanelContentStore as item}
		{#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.HOVER}
			<svelte:component this={item.component} />
		{/if}
	{/each}
{/if}

<style>
	#backgroundFrame {
		background-color: var(--backgroundFrameColor);
		width: 100vw;
		height: 100vh;
		position: relative;
		margin: auto;
		overflow: hidden;
	}
	#topMenuFrame {
		position: sticky;
		width: 100vw;
	}
	#bottomMenuFrame {
		position: sticky;
		width: 100vw;
	}
	#leftMenuFrame {
		height: 100vh;
	}
	#leftPanelFrame {
		background-color: var(--backgroundColor);
		height: 100vh;
	}

	#rightMenuFrame {
		height: 100vh;
	}
	#rightPanelFrame {
		background-color: var(--backgroundColor);
		height: 100vh;
	}
	#editor {
		width: 100%;
		height: auto;
		max-width: var(--editorWidth);
		max-height: 100vh;
		margin: auto;
		overflow: auto !important;
		background-color: var(--editorBackgroundColor);
	}
</style>
