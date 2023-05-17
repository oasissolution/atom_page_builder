<script>
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalComponentCollectionStore, globalThemeStore, globalEditorPreferencesStore } from "../../globals/globalstores.js";
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
    let selectorPositionDataRight = "0px;"

    /**
     * Position of "Actions" panel according to top-right corner on X axis.
     */
    let marginX = "6px";
    /**
     * Position of "Actions" panel according to top-right corner on Y axis.
     */
    let marginY = "6px";
    /**
     * Width of "Actions" panel.
     */
     let ActionsWidth = "66px";

    $: selectedType, (() => {
        if(actionsComponent !== undefined){
            marginX = actionsComponent.marginX;
            marginY = actionsComponent.marginY;
            ActionsWidth = actionsComponent.ActionsWidth;
            // console.log("marginX: "+ marginX + "| marginY: " + marginY);
        }else{
            marginX = "-40px";
            marginY = "0px";
            ActionsWidth = "64px"
        }
    })();

    /**
     * @type HTMLElement
     */
    let previousSelectedElement;

    // $: $globalComponentCollectionStore, (updateSelector)("globalComponentCollectionStore");

    $: $globalSelectedElementStore, (()=>{
        if(previousSelectedElement){
            if(previousSelectedElement != $globalSelectedElementStore){
                updateSelector("globalSelectedElementStore");
                previousSelectedElement = $globalSelectedElementStore;
            }
        }else{
            updateSelector("globalSelectedElementStore");
            previousSelectedElement = $globalSelectedElementStore;
        }

        if($globalSelectedElementStore == null){
            selectorPositionDataWidth = "100px";
            selectorPositionDataHeight = "100px";
            selectorPositionDataLeft = "-100px";
            selectorPositionDataTop = "-100px";
            selectorPositionDataRight = "px";

        }
    })();

    
    /**
     * 
     * @param {string} source Where this function is called from. Added for debug purposes.
     */
    function updateSelector(source){

        // console.log("updateSelector called from " + source);

        // if($globalSelectedElementStore != null && $globalSelectedElementStore != undefined && actionsComponent !== undefined){
        if($globalSelectedElementStore != null && $globalSelectedElementStore != undefined){

            /**
             * Position and dimension data of selected element.
             * @type DOMRect
             */
            const rect = $globalSelectedElementStore.getBoundingClientRect();

            // selectorPositionDataWidth = rect.width ? rect.width.toString()+"px" : "60px" ;
            // selectorPositionDataHeight = rect.height.toString()+"px";
            // selectorPositionDataLeft = rect.left.toString()+"px";
            selectorPositionDataRight = rect.right.toString()+"px";
            selectorPositionDataTop = rect.top.toString()+"px";

            // atomSelectorActionsWidth = atomSelectorActions.offsetWidth > 60 ? atomSelectorActions.offsetWidth.toString()+"px" : "60px";
            // atomSelectorActionsWidth = parseInt(ActionsWidth.replaceAll("px","")) > 60 ? ActionsWidth : "60px";

            // console.log("rect : " + JSON.stringify(rect));

            /**
             * @type string
             */
            var type = getTypeOfComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore); // $globalSelectedElementStore.id
            // console.log("type : " + type);

            var tempWidth = parseInt(ActionsWidth.replaceAll("px",""));

            if(type != undefined){

                if(rect.top < 40){
                    selectorPositionDataTop = (rect.bottom + 4).toString()+"px";
                }else{
                    selectorPositionDataTop = (rect.top - 38).toString()+"px";
                }

                var left = rect.right - tempWidth;

                if(left<10){
                    selectorPositionDataLeft = "10px";
                }else{
                    selectorPositionDataLeft = (left - 6).toFixed(0) + "px";
                }

            }

            // console.log(
            //     "selectorPositionDataLeft: "+selectorPositionDataLeft.toString()+
            //     "\nselectorPositionDataTop: "+selectorPositionDataTop.toString()+
            //     // "\natomSelectorActions.offsetWidth: "+atomSelectorActions.offsetWidth.toString()+ 
            //     "\nActionsWidth: "+ActionsWidth
            //     );

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

    <div id="atomSelectorActions" bind:this={atomSelectorActions} class="rounded-md absolute h-8 p-0 m-0 z-50 flex min-w-max items-center content-center shadow-md"
    class:invisible={!($globalSelectedElementUuidStore != null && $globalSelectedElementUuidStore != "")}
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

    <svelte:component this={JsonOfModules[$selectedType]} bind:this={actionsComponent} />

    {/if}

    </div>

<style>

    /* #atomSelector{
        position: absolute;
        z-index: 0;
        border: 2px dotted aqua;
        background-color: transparent;
        top: var(--selectorPositionDataTop);
        left: var(--selectorPositionDataLeft);
        width: var(--selectorPositionDataWidth);
        height: var(--selectorPositionDataHeight);
    } */

    #atomSelectorActions{
        position: absolute;
        /* background-color: var(--fixedPanelBackgroundColor);
        color: var(--fixedPanelForegroundColor); */
        top: calc(var(--selectorPositionDataTop) + var(--marginY));
        left: calc(var(--selectorPositionDataLeft) + var(--marginX));
        /* left: calc(var(--selectorPositionDataLeft) + var(--selectorPositionDataWidth) - var(--atomSelectorActionsWidth) + var(--marginX)); */
    }



    /* :global(.hr) {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: black;
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
    } */






</style>