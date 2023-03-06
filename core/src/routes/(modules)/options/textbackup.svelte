<script>
    import { onMount } from "svelte";
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getDataFromComponent } from "../../globals/globalfunctions.js";
    import { browser } from "$app/environment"; 
    import { getContext } from 'svelte';

    // const { updateEditor } = getContext('updateEditor');

    /**
     * Updates Editor Panel
     * @type function
     */
    let updateEditor = getContext('updateEditor');

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
     * Text Input Value
     * @type string
     */
    let textInput;

    let loaded = false;

    // $: $globalComponentCollectionStore, (() => {
    //     textInput = getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString();
    // })();

    $: $globalSelectedElementUuidStore, (() => {
        if(loaded == true){
            textInput = getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString();
        }
    })();

    function updateText(){
        if(browser === true && loaded === true){ //work only in browser. otherwise resets text
            console.log("New Value: "+textInput);

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
                console.log("updateGlobalComponentCollectionStore executed in updateText : \"" + getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString() + "\"");
                // updateEditorFunction();
                // updateEditor();
                // eventBus('updateEditor');
                // updateEditorScreenEvent('myevent');
                // updateEditorScreenEvent('myevent', { message: 'Hello world!' });

            }
        }
    }

    $: textInput, updateText();

    onMount(() => {

        textInput = getDataFromComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore, "text").toString();
        loaded = true;

    });

</script>


    Text Options
    <br/>
    {#if selectedTabPageIndex==0}
    <br/>
    {$globalSelectedElementUuidStore}
    <br/>

    <!-- <input type="text" on:change={updateText} bind:value={textInput}/> -->
    <input type="text" on:change={updateText} bind:value={textInput}/>
    <!-- <input type="text" on:change={updateEditor} bind:value={textInput}/> -->


    <pre class="text-[8px]">{JSON.stringify($globalComponentCollectionStore, null, 2)}</pre>
    
    {:else if selectedTabPageIndex==1}
    Tab Page 2
    {/if}


