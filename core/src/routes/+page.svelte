<script>
	import { onMount } from "svelte";

    // import Editor from "./(editor)/editor/+page.svelte";
    import { globalEditorPreferencesStore } from "./globalstores.js";

    import Test from "./menu/test.svelte";

    // let frame;


    // console.log(frame);

    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);



    onMount(()=>{
        window.addEventListener('message', event => {
            // if(event.source !== frame.content){
            //     return;
            // }
            globalEditorPreferences.info = event.data;
        });

        // send stores in a {} to iframe
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

    <Test />

</div>

<style>

    #frame{
        width: var(--editorWidth);
        height: 100vh;
    }

</style>