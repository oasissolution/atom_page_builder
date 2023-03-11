<script>
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";
    import { globalComponentCollectionStore } from "../../globals/globalstores.js";
    import { getTypeOfComponent } from "../../globals/globalfunctions.js";
    import { writable } from "svelte/store";

    /**
    * Main selector div and actions binding.
    * @type HTMLElement
    */
    let atomSelector;

    /**
    * Main selector actions binding.
    * @type HTMLElement
    */
    let atomSelectorActions;

    /**
     * Type of selected element
     * @type Writable<string>
     */
    let selectedType = writable("");

    /**
     * @type SvelteComponent
     */
    let actionsComponent;


    let selectorPositionDataWidth = "100px";
    let selectorPositionDataHeight = "100px";
    let selectorPositionDataLeft = "-100px";
    let selectorPositionDataTop = "-100px";
    let atomSelectorActionsWidth = "68px";

    /**
     * Position of "Actions" panel according to top-right corner on X axis.
     */
    let marginX = "6px";
    /**
     * Position of "Actions" panel according to top-right corner on Y axis.
     */
    let marginY = "6px";

    $: selectedType, (() => {
        if(actionsComponent !== undefined){
            marginX = actionsComponent.marginX;
            marginY = actionsComponent.marginY;
            // console.log("marginX: "+ marginX + "| marginY: " + marginY);
        }else{
            marginX = "-40px";
            marginY = "0px";
        }
    })();


    $: $globalComponentCollectionStore, (updateSelector)();

    $: $globalSelectedElementStore, (updateSelector)();

    function updateSelector(){

        if($globalSelectedElementStore != null && $globalSelectedElementStore != undefined && actionsComponent !== undefined){

            /**
             * Position and dimension data of selected element.
             * @type DOMRect
             */
            const rect = $globalSelectedElementStore.getBoundingClientRect();

            selectorPositionDataWidth = rect.width.toString()+"px";
            selectorPositionDataHeight = rect.height.toString()+"px";
            selectorPositionDataLeft = rect.left.toString()+"px";
            selectorPositionDataTop = rect.top.toString()+"px";

            atomSelectorActionsWidth = atomSelectorActions.offsetWidth > 60 ? atomSelectorActions.offsetWidth.toString()+"px" : "60px";

            var type = getTypeOfComponent($globalComponentCollectionStore, $globalSelectedElementStore.id);
            // console.log("type : " + type);
            selectedType.set(type);

        }


    }


    // TODO: import all modules dynamically

    // import Body from "../../(modules)/modules/body.svelte";
    import Div from "../../(modules)/actions/div.svelte";
    import Text from "../../(modules)/actions/text.svelte";


    /**
     * Definition and list of all modules in a JSON.
     * @returns {JSON}
     *
     */
    const JsonOfModules = {
        // "body": Body,
        "div": Div,
        "text": Text,
    };


</script>

        <div id="atomSelectorActions" bind:this={atomSelectorActions} class="bg-white rounded-md absolute h-8 p-0 m-0 z-50 flex min-w-max items-center content-center"
        style='
        --selectorPositionDataWidth:{selectorPositionDataWidth};
        --selectorPositionDataHeight:{selectorPositionDataHeight};
        --selectorPositionDataLeft:{selectorPositionDataLeft};
        --selectorPositionDataTop:{selectorPositionDataTop};
        --atomSelectorActionsWidth:{atomSelectorActionsWidth};
        --marginX:{marginX};
        --marginY:{marginY};
        '>

        {#if $selectedType != ""}

        <svelte:component this={JsonOfModules[$selectedType]} bind:this={actionsComponent}/>

        {/if}

        </div>



<style>

    #atomSelector{
        position: absolute;
        z-index: 0;
        border: 2px dotted aqua;
        /* background-color:cadetblue; */
        background-color: transparent;
        top: var(--selectorPositionDataTop);
        left: var(--selectorPositionDataLeft);
        width: var(--selectorPositionDataWidth);
        height: var(--selectorPositionDataHeight);
    }

    #atomSelectorActions{
        position: absolute;
        top: calc(var(--selectorPositionDataTop) + var(--marginY));
        left: calc(var(--selectorPositionDataLeft) + var(--selectorPositionDataWidth) - var(--atomSelectorActionsWidth) + var(--marginX));
    }



    :global(.hr) {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: black; /* var(--foregroundColor) */
        opacity: 0.25;
    }

    :global(.vr) {
        display: inline-block;
        align-self: stretch;
        width: 1px;
        min-height: 1em;
        background-color: black;
        opacity: 0.25;
        margin-right: 4px;
        margin-left: 4px;
    }






</style>