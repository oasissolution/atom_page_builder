<script>
    import "../../../app.css";
    import { onMount } from "svelte";
    import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";
    import Editortree from "./editortree.svelte";
    import Selector from "../../(shared)/shared/selector.svelte";

    /// ATTENTION ! 

    /// Editor panel runs in an iframe. Hence, defined stores here are different than main stores in runtime, even if their names and definitions are identical.
    /// You may think this as, same stores running in two different threads with different values.

    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);


    onMount(() => {

        // Listen for messages from the outer page
        window.addEventListener('message', event => {
            // Check that the message is from a trusted source
            if (event.origin !== window.location.origin) {
                return;
            }
            // Get the data from the message
            const data = event.data.message;

            if(data === undefined){
                console.log("Incoming data do not have message!");
            }else{
                /// Set data as global writables
                globalComponentCollection = data.componentCollection;
                globalEditorPreferences = data.editorPreferences;
            }
        });

    });

   
    // TODO: import all modules dynamically

    import Body from "../../(modules)/modules/body.svelte";
    import Div from "../../(modules)/modules/div.svelte";
    import Text from "../../(modules)/modules/text.svelte";

    /**
     * Definition and list of all modules in a JSON.
     * @returns {JSON}
     * 
     */
    const JsonOfModules = {
        "body": Body,
        "div": Div,
        "text": Text,
    };


</script>



<div id="editorInnerPanel">

    {#if $globalComponentCollectionStore}
    {#each $globalComponentCollectionStore as component}
        <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid} selected={component.selected}>
        <Editortree component={component} JsonOfModules={JsonOfModules}></Editortree>
        </svelte:component>
    {/each}
    {:else}
    <div class="w-[100vw] h-[100vh] flex justify-center align-middle content-center text-2x" > <span>Loading...</span> </div>
    {/if}

    <!-- line below will be removed later -->
    <div class="flex flex-row">
        <pre class="text-[10px]">{JSON.stringify($globalComponentCollectionStore, null, 2)}</pre>

    </div>

</div> <!-- editorInnerPanel -->
    
<svelte:component this={Selector} />

<style>

    #editorInnerPanel{
        width: 100%; 
        height: 100vh; /* subject to change in following versions */
    }

</style>