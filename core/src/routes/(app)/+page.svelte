<script>
	import { onMount } from "svelte";

    import { globalEditorPreferencesStore, globalEditorViewStore, globalComponentCollectionStore } from "../globals/globalstores.js";
    import { globalSelectedElementUuidStore } from "../globals/selectorstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes } from "../globals/globalfunctions.js";

    import Code from "../(editor)/editor/code.svelte";
    import Variables from "../(editor)/editor/variables.svelte";


    // /**
    //  * @type HTMLElement
    //  */
    let editorFrame;


    // console.log(frame);

    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let globalSelectedElement = $globalSelectedElementUuidStore;
    $: globalSelectedElementUuidStore.set(globalSelectedElement);

    let buildType = globalEditorPreferences.build;

    let loaded = false;

    // $: $globalEditorPreferencesStore, (() => {
    //     if(loaded == true && editorFrame !== null && editorFrame !== undefined ){
    //         console.log("Send data on globalEditorPreferencesStore !");
    //         const data = {
    //             "message": {
    //                 "componentCollection": $globalComponentCollectionStore,
    //                 "editorPreferences": $globalEditorPreferencesStore
    //             }
    //         };
    //         // editorFrame.contentWindow.postMessage(data, '*');
    //     }
    // })();



    $: $globalComponentCollectionStore, (() => {

        if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

            if(buildType == "release"){
                if(editorFrame.src !== "/atompagebuilder/app/editor"){
                    editorFrame.src = "/atompagebuilder/app/editor";
                };
            }

            // console.log("Send data on globalComponentCollectionStore !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            editorFrame.contentWindow.postMessage(data, '*');
        }
    })();

    function updateEditorFunction(){
        if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

            if(buildType == "release"){
                if(editorFrame.src !== "/atompagebuilder/app/editor"){
                    editorFrame.src = "/atompagebuilder/app/editor";
                };
            }

            // console.log("Send data on updateEditorFunction !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            editorFrame.contentWindow.postMessage(data, '*');
            // console.log("updateEditorFunction executed!");
        }
    }

    let previousSelectedHtmlElementUuid = "";

    onMount(()=>{
        window.addEventListener('message', event => {

            // if(previousSelectedHtmlElementUuid != "") updateGlobalComponentCollectionStore($globalComponentCollectionStore, previousSelectedHtmlElementUuid, false, null, "selected" );

            if(previousSelectedHtmlElementUuid != "") if(updateGlobalComponentCollectionStore(
                $globalComponentCollectionStore, //jsonData
                previousSelectedHtmlElementUuid, //uuid
                " outline-dashed outline-2 outline-offset-2 outline-sky-500", //newValue
                "class", //dataTarget
                null, //target
                UpdateActionTypes.REMOVE, //action
                "" //replace value
                ))
            {
                updateEditorFunction();
            }

            // if(event.source !== frame.content){
            //     return;
            // }
            /// infoya yüklediğimde sayfayı yeniliyor.
            // globalEditorPreferences.info = event.data;
            globalSelectedElement = event.data;
            //TODO: add css to globalComponentCollectionStore JSON to selected uuid to show its selected OR make a routine for selected element ?? 

            // if(updateGlobalComponentCollectionStore($globalComponentCollectionStore, event.data, true, null, "selected" )){
            //     updateEditorFunction();
            // }

            if(updateGlobalComponentCollectionStore(
                $globalComponentCollectionStore, //jsonData
                event.data, //uuid
                " outline-dashed outline-2 outline-offset-2 outline-sky-500", //newValue
                "class", //dataTarget
                null, //target
                UpdateActionTypes.APPEND, //action
                "" //replace value
                ))
            {
                updateEditorFunction();
            }

            previousSelectedHtmlElementUuid = event.data;
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
            editorFrame.contentWindow.postMessage(data, '*');
        });

        if(buildType == "release"){
            editorFrame.src = "/atompagebuilder/app/editor";
        }

        

    });

</script>



<div id="frame">

    {#if $globalEditorViewStore == EditorViews.PAGE}

    <iframe id="editorFrame" bind:this={editorFrame} src="/editor" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>

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