<script>
    import { onMount, onDestroy } from "svelte";
    import jQuery from "jquery";

    export let name = "Nothing";

    /**
     * @type JSON
     */
    export let componentCollection;
    /**
     * @type JSON
     */
    export let editorPreferences;

    /**
     * @type JSON
     */
    let componentCollectionInside;
    $: componentCollection,  (()=>{
        componentCollectionInside = componentCollection;
    })();

    /**
     * @type JSON
     */
    let editorPreferencesInside;
    $: editorPreferences,  (()=>{
        editorPreferencesInside = editorPreferences;
    })();



    onMount(() => {

        jQuery("#editorInnerPanel > *")
            .on("mouseover", (e) => {
                var target = e.target;
                jQuery(target).addClass("hovered");
                // setSelectedElement(jQuery(target).attr("class"));
                window.parent.postMessage(jQuery(target).attr("class"), '*');

            }).on("mouseout", (e) => {
                var target = e.target;
                jQuery(target).removeClass("hovered");
            });

            

            // add eventlistener for @ here to listen from parent !

            // globalComponentCollectionStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });

            // globalEditorPreferencesStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });

            // globalEditorViewStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });

    });

</script>


<svelte:head>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</svelte:head>



<div id="editorInnerPanel">
    <div class="text-3xl" > Editor Page says Helloo {name} </div>

    <!-- <div class="flex flex-row md:columns-2"> -->
    <div class="container-fluid row">
        <div class="col-lg-6 col-md-6 col-sm-12">

            <pre>{JSON.stringify(componentCollectionInside, null, 2)}</pre>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">

            <pre>{JSON.stringify(editorPreferencesInside, null, 2)}</pre>
        </div>
    </div>

</div> <!-- editorInnerPanel -->


<style>


    #editorInnerPanel{
        width: 100%; /* var(--editorWidth) !important; */
        height: 100vh;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .hovered{
        border: 2px solid aqua; /* var(--editorMouseOverColor); */
    }



</style>