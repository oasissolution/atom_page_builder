<script>
    // import { onMount, onDestroy } from "svelte";
    import jQuery from "jquery";
    import { onMount } from "svelte/types/runtime/internal/lifecycle";


    /**
     * Data coming from main frame
     * @type JSON
     */
     let incomingData;


    /**
     * Component Collection used by editor.
     * @type []
     */
    let componentCollection = incomingData.componentCollection;

    /**
     * Component Collection used by editor.
     * @type []
     */
    let editorPreferences = incomingData.editorPreferences;


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

<!-- style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
    --editorMouseOverColor:{$globalEditorPreferencesStore.editorTheme.editorMouseOverColor};


' -->

<div id="editorInnerPanel" class="clearfix" 


>
    <input type="hidden" class="hovered" />

    <div class="w-full"> <h1 class="text-2xl">This is editor</h1></div>

    <div class="w-full flex columns-2">
        <pre>{JSON.stringify(componentCollection, null, 2)}</pre>
        <pre>{JSON.stringify(editorPreferences, null, 2)}</pre>
    </div>



</div>






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