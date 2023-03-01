<script>
    import Editortree from "./editortree.svelte";
    import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";

    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);


    // TODO: import all modules dynamically

    import Body from "../../(modules)/modules/body.svelte";
    import Div from "../../(modules)/modules/div.svelte";
    import Text from "../../(modules)/modules/text.svelte";

    /**
     * @returns {JSON}
     */
    const JsonOfModules = {
        "body": Body,
        "div": Div,
        "text": Text,
    };

</script>

{#if $globalComponentCollectionStore}
    {#each $globalComponentCollectionStore as component}
        <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid} selected={component.selected}>
        <Editortree component={component} JsonOfModules={JsonOfModules}></Editortree>
        </svelte:component>
    {/each}
{:else}
<div class="w-full h-full flex justify-center align-middle content-center text-2x" > <span>Loading...</span> </div>
{/if}