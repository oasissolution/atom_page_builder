<script>
    import "../../../app.css";
    import { onMount, onDestroy } from "svelte";
    import jQuery from "jquery";
    import Editortree from "./editortree.svelte";

    // export let name = "Nothing";

    // export const prerender = true;

    /**
     * @type []
     */
    let componentCollection;
    /**
     * @type []
     */
    let editorPreferences;

    /**
     * @type []
     */
    let componentCollectionInside;
    $: componentCollection,  (()=>{
        componentCollectionInside = componentCollection;
        // loadModule(componentCollection);
    })();

    /**
     * @type []
     */
    let editorPreferencesInside;
    $: editorPreferences,  (()=>{
        editorPreferencesInside = editorPreferences;
        
    })();


    let pageResult;


    onMount(() => {

        // jQuery(()=>{
        //     jQuery("#editorInnerPanel > *")
        //     .on("mouseover", (e) => {
        //         var target = e.target;
        //         jQuery(target).addClass("hovered");
        //         // setSelectedElement(jQuery(target).attr("class"));
        //         window.parent.postMessage(jQuery(target).attr("class"), '*');

        //     }).on("mouseout", (e) => {
        //         var target = e.target;
        //         jQuery(target).removeClass("hovered");

        //     });
        // });

        jQuery("#editorInnerPanel > *")
            .on("mouseover", (e) => {
                var target = e.target;
                if(target.id != "atomBody"){
                    jQuery(target).addClass("hovered");
                    // setSelectedElement(jQuery(target).attr("class"));
                    window.parent.postMessage(jQuery(target).attr("class"), '*');
                }
            }).on("mouseout", (e) => {
                var target = e.target;
                jQuery(target).removeClass("hovered");

            });
            // .on("click", (e) => {
            //     var target = e.target;
            //     console.log(target.innerHTML);
            // });



         // Listen for messages from the outer page
        window.addEventListener('message', event => {
            // console.log("origin check");
            // Check that the message is from a trusted source
            if (event.origin !== window.location.origin) {
                return;
            }
            // console.log("after origin check");
            // console.log(event.data);
            // Get the data from the message
            const data = event.data.message;

            if(data === undefined){
                console.log("Incoming data do not have message!");
            }else{
                // console.log("after message");
                // console.log(data);

                componentCollection = data.componentCollection;
                editorPreferences = data.editorPreferences;
            }


            // Do something with the data
            // console.log("data received"); // Output: "Hello from the outer page!"
        });


    });


   
    //TODO: import all modules dynamically

    import Body from "../../(modules)/modules/body.svelte";
    import Div from "../../(modules)/modules/div.svelte";
    import Text from "../../(modules)/modules/text.svelte";

    /**
     * @returns {JSON}
     */
    const JsonOfModules = {
        "body": Body,
        "div": Div,
        "text": Text,
    };


</script>

<input type="hidden" class="hovered" />

<div id="editorInnerPanel">

    {#if componentCollection}
        <!-- {#each componentCollection as component}
            {component}
            <pre>{JSON.stringify(component, null, 2)}</pre>
            {loadModule(component)}
        {/each} -->
        <!-- {pageResult} -->
        {#each componentCollection as component}
            <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid}>
            <Editortree component={component} JsonOfModules={JsonOfModules}></Editortree>
            </svelte:component>
            
            <!-- <Editortree component={component} JsonOfModules={JsonOfModules}>
                <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid}></svelte:component>
            </Editortree> -->
            <!-- <Editortree {component} let:component>
                <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid}></svelte:component>;
            </Editortree> -->
        {/each}
    {:else}
    <div class="w-full h-full place-content-center text-2x" > <span>Loading...</span> </div>
    {/if}
    





<!-- 
    <div class="w-full text-3xl md:text-sky-300" > Editor Page says Helloo  </div>

    <div class="w-full flex flex-wrap">
        <div class="flex-1">

            <pre>{JSON.stringify(componentCollectionInside, null, 2)}</pre>
        </div>
        <div class="flex-1">

            <pre>{JSON.stringify(editorPreferencesInside, null, 2)}</pre>
        </div>
    </div> -->

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