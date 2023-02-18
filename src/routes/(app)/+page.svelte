<script>
    // import Editor from "./(editor)/editor/+page.svelte";
    import { globalEditorPreferencesStore } from "../globals/globalstores.js";

    let frame;

    // console.log(frame);

</script>

<!-- <Editor /> -->
<!-- <svelte:component this={Editor}/> -->

<iframe id="frame" bind:this={frame} src="/editor" title="Editor" class=""  style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};


'
> ></iframe>



<style>

    #frame{
        width: var(--editorWidth);
        height: 100vh;
    }

</style>