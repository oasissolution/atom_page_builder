<script>
    import "../../../app.css";
    import { onMount, onDestroy } from "svelte";
    import jQuery from "jquery";

    // export let name = "Nothing";

    /**
     * @type JSON
     */
    let componentCollection;
    /**
     * @type JSON
     */
    let editorPreferences;

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

            


         // Listen for messages from the outer page
        window.addEventListener('message', event => {
            console.log("origin check");
            // Check that the message is from a trusted source
            if (event.origin !== window.location.origin) { 
                return;
            }

            // Get the data from the message
            const data = event.data.message;

            console.log(data);

            componentCollection = data.componentCollection;
            editorPreferences = data.editorPreferences;

            // Do something with the data
            console.log("data received"); // Output: "Hello from the outer page!"
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

<input type="hidden" class="hovered" />

<div id="editorInnerPanel">
    <div class="w-full text-3xl md:text-sky-300" > Editor Page says Helloo  </div>

    <div class="w-full flex flex-wrap">
        <div class="flex-1">

            <pre>{JSON.stringify(componentCollectionInside, null, 2)}</pre>
        </div>
        <div class="flex-1">

            <pre>{JSON.stringify(editorPreferencesInside, null, 2)}</pre>
        </div>
    </div>

</div> <!-- editorInnerPanel -->


<style>


    #editorInnerPanel{
        width: 100%; /* var(--editorWidth) !important; */
        height: 100vh;
        /* vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap; */
    }

    .hovered{
        border: 2px solid aqua; /* var(--editorMouseOverColor); */
    }



</style>