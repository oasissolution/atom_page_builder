<script>
    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Layers from "./layers.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore, globalHoverButton } from "../../globals/globalstores.js";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";
	import Button from "../../uicomponents/button.svelte";
    import { MenuLocations } from "../../globals/globalconstants.js";

    /**
     * Added for later use
     */
    export const componentName = "Layers";

    /**
    * If true, returns button for menu bar.
    * If false, returns panel.
    *
    * @type Boolean
    */
    export let onlyButton = false;


    /**
     * Toggles visibility of "Layers" panel.
     */
    function toggleLayerPanel(){
        ///Register variables first. (Moved to root level loadvariables.svelte)
        // layerPanelSetUp();

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.layerPanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.layerPanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "layerPanel"){
                        globalVisibility.left[key] = !visible;
                    }else{
                        globalVisibility.left[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.right.layerPanel = false; /// Hide in other locations
                globalVisibility.default.layerPanel = false; /// Hide in other locations
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                var visible = globalVisibility.right.layerPanel ?? false;
                for(var key in globalVisibility.right) {
                    if(key == "layerPanel"){
                        globalVisibility.right[key] = !visible;
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.layerPanel = false; /// Hide in other locations
                globalVisibility.default.layerPanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.layerPanel = !globalVisibility.default.layerPanel ?? true;
                globalVisibility.right.layerPanel = false; /// Hide in other locations
                globalVisibility.left.layerPanel = false; /// Hide in other locations
                break;
        }

        ///Updates "globalVisibilityStore"
        globalVisibilityStore.set(globalVisibility);

        if($globalEditorPreferencesStore.menuLocation == MenuLocations.TOP || $globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM){
            globalHoverButton.set(buttonHorizontal);
        }else{
            globalHoverButton.set(buttonVertical);
        }
        
    }



   
    // This was added to have hover property. If we return to add this idea this may be needed.
    // function getOffset(el) {
    //     const rect = el.getBoundingClientRect();
    //     return {
    //         left: rect.left + window.scrollX,
    //         top: rect.top + window.scrollY
    //     };
    // }

    /**
     * @type HTMLButtonElement
     */
    let buttonHorizontal;
    /**
     * @type HTMLButtonElement
     */
    let buttonVertical;

</script>

{#if onlyButton}

    {#if $globalEditorPreferencesStore.menuLocation == MenuLocations.TOP || $globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM}

    <Iconbutton bind:bindElement={buttonHorizontal} 
    active={
    $globalVisibilityStore.default.layerPanel == true || 
    $globalVisibilityStore.right.layerPanel == true || 
    $globalVisibilityStore.left.layerPanel == true
    } 
    noBackground={true} 
    on:click={toggleLayerPanel} 
    clickOnHover={$globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.HOVER}
    >
        <span slot="icon"><i class="bi bi-stack"></i></span>
    </Iconbutton>

    {:else}

    <Button bind:bindElement={buttonHorizontal} 
    active={
    $globalVisibilityStore.default.layerPanel == true || 
    $globalVisibilityStore.right.layerPanel == true || 
    $globalVisibilityStore.left.layerPanel == true
    } 
    on:click={toggleLayerPanel} horizontal={false} 
    clickOnHover={$globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.HOVER}
    >

        <span slot="iconTop"><i class="bi bi-stack"></i></span>
        <span slot="text">Layers</span>

    </Button>

    {/if}

{:else}

    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.HOVER}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.default.layerPanel == true}
                    {#if $globalEditorPreferencesStore.menuLocation == MenuLocations.TOP || $globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM}
                        <Hover buttonOfContainer={$globalHoverButton} horizontal on:togglePanel={toggleLayerPanel}>
                            <Layers />
                        </Hover>
                    {:else}
                        <Floating>
                            <Layers />
                        </Floating>
                    {/if}
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.FLOAT}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.default.layerPanel == true}
                    <Floating>
                        <Layers />
                    </Floating>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.FIXEDLEFT}
        {#if $globalVisibilityStore.hasOwnProperty("left")}
            {#if $globalVisibilityStore.left.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.left.layerPanel == true}
                    <Fixed side="L">
                        <Layers />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.FIXEDRIGHT }
        {#if $globalVisibilityStore.hasOwnProperty("right")}
            {#if $globalVisibilityStore.right.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.right.layerPanel == true}
                    <Fixed side="R">
                        <Layers />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}

{/if}

<style>
    .hoverPanel{
        position: absolute;
        z-index: 888;

    }
</style>