<script>
    import Editor from "./(editor)/editor/+page.svelte";

    let frame;

    // console.log(frame);

</script>

<!-- <Editor /> -->
<svelte:component this={Editor}/>

<!-- <iframe id="frame" bind:this={frame} src="/editor" title="Editor" class="" ></iframe> -->



<style>

    #frame{
        width: 100%;
        height: 100vh;
    }

</style>