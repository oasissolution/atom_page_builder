<script>
	import { onMount } from "svelte";

    import { globalEditorPreferencesStore, globalEditorViewStore, globalComponentCollectionStore } from "../globals/globalstores.js";
    import { globalSelectedElementUuidStore } from "../globals/selectorstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes } from "../globals/globalfunctions.js";
    import { setContext } from 'svelte';

    import Code from "../(editor)/editor/code.svelte";
    import Variables from "../(editor)/editor/variables.svelte";


    /**
     * @type HTMLIFrameElement
     */
    let editorFrame;


    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let globalSelectedElement = $globalSelectedElementUuidStore;
    $: globalSelectedElementUuidStore.set(globalSelectedElement);

    let buildType = globalEditorPreferences.build;

    let loaded = false;


    $: $globalComponentCollectionStore, (() => {

        if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

            // console.log("Send data on globalComponentCollectionStore !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
        }
    })();


    function updateEditorFunction(){
        if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

            // console.log("Send data on updateEditorFunction !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
            // console.log("updateEditorFunction executed!");
        }
    }

    let previousSelectedHtmlElementUuid = "";

    /**
     * @type function
     */
    const updateEditor = () => {
        console.log("editor updated from child component");
        updateEditorFunction();
    }
    setContext('updateEditor', { updateEditor });

    onMount(()=>{


        
        ///Listen editor in iframe
        window.addEventListener('message', event => {

            // if(previousSelectedHtmlElementUuid != "") if(updateGlobalComponentCollectionStore(
            //     $globalComponentCollectionStore, //jsonData
            //     previousSelectedHtmlElementUuid, //uuid
            //     "outline-dashed outline-2 outline-offset-2 outline-sky-500", //newValue
            //     "class", //dataTarget
            //     null, //target
            //     UpdateActionTypes.REMOVE, //action
            //     "" //replace value
            //     ))
            // {
            //     updateEditorFunction();
            // }

            if(previousSelectedHtmlElementUuid != "") if(updateGlobalComponentCollectionStore(
                $globalComponentCollectionStore, //jsonData
                previousSelectedHtmlElementUuid, //uuid
                false, //newValue
                null, //dataTarget
                "selected", //target
                UpdateActionTypes.SET, //action
                "" //replace value
                ))
            {
                updateEditorFunction();
            }

            /// event.data is uuid of selected element. So set globally, that way we can use everywhere in our app 
            globalSelectedElement = event.data;


            // if(updateGlobalComponentCollectionStore(
            //     $globalComponentCollectionStore, //jsonData
            //     event.data, //uuid
            //     "outline-dashed outline-2 outline-offset-2 outline-sky-500", //newValue
            //     "class", //dataTarget
            //     null, //target
            //     UpdateActionTypes.APPEND, //action
            //     "" //replace value
            //     ))
            // {
            //     updateEditorFunction();
            // }

            if(updateGlobalComponentCollectionStore(
                $globalComponentCollectionStore, //jsonData
                event.data, //uuid
                true, //newValue
                null, //dataTarget
                "selected", //target
                UpdateActionTypes.SET, //action
                "" //replace value
                ))
            {
                updateEditorFunction();
            }

            /// Set selected element as previous, so it will be easy to revert selection effects.
            previousSelectedHtmlElementUuid = event.data;

            // eventBus('updateEditor', updateEditorFunction);

        });

        loaded = true;

        // send stores in a {} to iframe
        editorFrame.addEventListener('load', () => {
            // console.log("Send data on load !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
        });

       
    });

</script>



<div id="frame">

    {#if $globalEditorViewStore == EditorViews.PAGE}

    {#if buildType == "release"}
    <iframe id="editorFrame" bind:this={editorFrame} src="editor.html" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>
    {:else}
    <iframe id="editorFrame" bind:this={editorFrame} src="/editor" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>
    {/if}
    {:else if $globalEditorViewStore == EditorViews.CODE }
    <svelte:component this={Code}/>
    {:else}
    <svelte:component this={Variables}/>
    {/if}

</div>


<style>

    #editorFrame{
        width: var(--editorWidth);
        height: 100vh;
    }

</style>