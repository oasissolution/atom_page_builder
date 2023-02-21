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


    let loaded = false;

    $: $globalEditorPreferencesStore, () => {
        if(loaded == true){
            console.log("Send data on globalEditorPreferencesStore !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            editorFrame.contentWindow.postMessage(data, '*');
        }
    };

    $: $globalComponentCollectionStore, () => {
        if(loaded == true){
            console.log("Send data on globalComponentCollectionStore !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore
                }
            };
            editorFrame.contentWindow.postMessage(data, '*');
        }
    };

    // $: $globalEditorPreferencesStore, refresh();
    // $: $globalEditorPreferencesStore, () => {
    //     if(loaded == true){
    //         console.log("globalEditorPreferencesStore updated. So is iframe");
    //         onLoad();
    //     }
    //     console.log("globalEditorPreferencesStore updated.");
    // };

    // function refresh(){
    //     if(loaded == true){
    //         console.log("globalEditorPreferencesStore updated. So is iframe");
    //         counter++;
    //         editorFrameDoc.src="about:blank";
    //         const _app = new Page({
    //             target: editorFrameDoc.body,
    //             props: {
    //                 name: "World!  => " + counter,
    //                 componentCollection: $globalComponentCollectionStore,
    //                 editorPreferences: $globalEditorPreferencesStore,
    //             }
    //         });
    //     }else{
    //         console.log("globalEditorPreferencesStore updated.");
    //     }
    // }

    // let counter = 0;
    // let loaded = false;

    // let editorFrameDoc;

    // function onLoad(ev){
    //     editorFrameDoc = editorFrame.contentDocument || editorFrame.contentWindow.document;

    //     loaded = true;
    //     counter++;

    //     // const _app = new Pagenew({
    //     //     target: editorFrameDoc.body,
    //     //     props: {
    //     //         name: "World!  => " + counter,
    //     //         componentCollection: $globalComponentCollectionStore,
    //     //         editorPreferences: $globalEditorPreferencesStore,
    //     //     }
    //     // });

    // }

    onMount(()=>{
        window.addEventListener('message', event => {
            // if(event.source !== frame.content){
            //     return;
            // }
            globalEditorPreferences.info = event.data;
        });

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


        // editorFrame.addEventListener('load', onLoad());

        // const iframe = document.getElementById("editorFrame");

        // iframe.onload = (ev) => {
        //     const app = new Page({
        //         target: iframe.contentWindow.document.body,
        //         props: {
        //             name: "World"
        //         }
        //     });
        // };

        

    });

</script>

<!-- <Editor /> -->
<!-- <svelte:component this={Editor}/> -->

<!-- bind:this={frame}  -->

<!-- <iframe id="frame" src="/editor" title="Editor" class=""  style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};


'
> ></iframe> -->

<div id="frame">

    {#if $globalEditorViewStore == EditorViews.PAGE}
    
    <iframe id="editorFrame" bind:this={editorFrame} src="/editor" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>


    <!-- <iframe id="editorFrame" bind:this={editorFrame} src="about:blank" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>   -->

    <!-- <Pagenew componentCollection={$globalComponentCollectionStore} editorPreferences={$globalEditorPreferencesStore} name={"World!!"} ></Pagenew>     -->
   
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