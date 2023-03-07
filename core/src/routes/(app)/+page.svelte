<script>
	import { onMount } from "svelte";

    import { globalEditorPreferencesStore, globalEditorViewStore, globalComponentCollectionStore } from "../globals/globalstores.js";
    import { globalSelectedElementUuidStore } from "../globals/selectorstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getComponent, addChildComponent } from "../globals/globalfunctions.js";
    import { v4 as uuidv4 } from 'uuid';

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
     * Sets selected element in JSON
     * @param {string} targetUuid uuid of selected element
     */
    function setSelectedElement(targetUuid){

        // console.log("Element Selected : " + targetUuid);

        /// if there is a selected element before, set as selected = false
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

        /// targetUuid is uuid of selected element. So set globally, that way we can use everywhere in our app 
        globalSelectedElement = targetUuid;

        /// set element as selected in JSON
        if(updateGlobalComponentCollectionStore(
            $globalComponentCollectionStore, //jsonData
            targetUuid, //uuid
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
        previousSelectedHtmlElementUuid = targetUuid;
    }

    /**
     * Adds new dropped element to Json.
     * @param {string} targetUuid uuid of selected element
     * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
     */
    function setDroppedElement(targetUuid, elementType){

        const defaultData = {
            "uuid": uuidv4().toString(),
            "type": elementType,
            "data": {},
            "selected": false,
            "children": []
        };

        addChildComponent($globalComponentCollectionStore, targetUuid, defaultData);
        updateEditorFunction();
    }

    onMount(()=>{

        
        
        ///Listen editor in iframe
        window.addEventListener('message', event => {

            if(event.data){
                // console.log("Gelen : " +JSON.stringify(event.data));
                switch(event.data.action){
                    case "selectElement":
                        setSelectedElement(event.data.data.uuid);
                        break;
                    case "dropElement":
                        setDroppedElement(event.data.data.uuid, event.data.data.elementType);
                        break;
                }

            }



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