<script>
    import { onMount } from "svelte";
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getDataFromComponent } from "../../globals/globalfunctions.js";

    /**
     * Integer variable that holds Tab Page Index.
     */
    let selectedTabPageIndex = 0;

    /**
     * Shows selected page.
     * @param {number} index New page index to show.
     */
    function showPage(index){
        selectedTabPageIndex = index;
    }

    /**
     * Holds value of Text Input
     * @type string
     */
    let textInput;

    // $: $globalComponentCollectionStore, (() => {
    //     textInput = getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString();
    // })();

    function updateText(){

        if(updateGlobalComponentCollectionStore(
            $globalComponentCollectionStore, //jsonData
            $globalSelectedElementUuidStore, //uuid
            textInput, //newValue
            "text", //dataTarget
            null, //target
            UpdateActionTypes.SET, //action
            "" //replace value
            ))
        {
            // updateEditorFunction();
        }

    }

    onMount(() => {

        textInput = getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString();

    });

</script>


    Text Options
    <br/>
    {#if selectedTabPageIndex==0}

    <input type="text" on:change={updateText} bind:value={textInput}/>
    
    {:else if selectedTabPageIndex==1}
    Tab Page 2
    {/if}