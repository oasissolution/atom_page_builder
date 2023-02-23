<script>
	import { onMount } from "svelte";

    import { globalEditorPreferencesStore, globalEditorViewStore, globalComponentCollectionStore } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";

    import Code from "../(editor)/editor/code.svelte";
    import Variables from "../(editor)/editor/variables.svelte";


    // let frame;
    let editorFrame;


    // console.log(frame);

    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

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

            console.log("Send data on globalComponentCollectionStore !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            editorFrame.contentWindow.postMessage(data, '*');
        }
    })();


    onMount(()=>{
        window.addEventListener('message', event => {
            // if(event.source !== frame.content){
            //     return;
            // }
            globalEditorPreferences.info = event.data;
        });

        loaded = true;

        // send stores in a {} to iframe
        editorFrame.addEventListener('load', () => {
            console.log("Send data on load !");
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