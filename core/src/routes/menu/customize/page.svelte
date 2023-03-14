<script>
    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Settings from "./settings.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../globals/globalstores.js";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { MenuLocations } from "../../globals/globalconstants.js";
	import Button from "../../uicomponents/button.svelte";

    /**
     * Added for later use
     */
    export const componentName = "Customize";

    /**
    * If true, returns button for menu bar.
    * If false, returns panel.
    *
    * @type Boolean
    */
    export let onlyButton = false;

    /**
     * Registers parameters needed by "Customize Editor" panel to "globalVisibilityStore"
     *
     * Moved to root level loadvariables.svelte. But left here for any need later as a backup for now.
     */
    function customizePanelSetUp(){

        let globalVisibility = $globalVisibilityStore;
        let edited = false;
        if(globalVisibility.hasOwnProperty("left")){
            if(globalVisibility.left.hasOwnProperty("customizePanel")){
                ///Do nothing
            }else{
                globalVisibility.left.customizePanel = false;
                edited = true;
            }
        }else{
            globalVisibility.left = {};
            globalVisibility.left.customizePanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("right")){
            if(globalVisibility.right.hasOwnProperty("customizePanel")){
                ///Do nothing
            }else{
                globalVisibility.right.customizePanel = false;
                edited = true;
            }
        }else{
            globalVisibility.right = {};
            globalVisibility.right.customizePanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("default")){
            if(globalVisibility.default.hasOwnProperty("customizePanel")){
                ///Do nothing
            }else{
                globalVisibility.default.customizePanel = false;
                edited = true;
            }
        }else{
            globalVisibility.default = {};
            globalVisibility.default.customizePanel = false;
            edited = true;
        }

        if(edited){
            globalVisibilityStore.set(globalVisibility);
        }
    }

    /**
     * Toggles visibility of "Customize Editor" panel.
     */
    function toggleCustomizePanel(){
        ///Register variables first. (Moved to root level loadvariables.svelte)
        // customizePanelSetUp();

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.customizePanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.customizePanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "customizePanel"){
                        globalVisibility.left[key] = !visible;
                    }else{
                        globalVisibility.left[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.right.customizePanel = false; /// Hide in other locations
                globalVisibility.default.customizePanel = false; /// Hide in other locations
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                var visible = globalVisibility.right.customizePanel ?? false;
                for(var key in globalVisibility.right) {
                    if(key == "customizePanel"){
                        globalVisibility.right[key] = !visible;
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.customizePanel = false; /// Hide in other locations
                globalVisibility.default.customizePanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.customizePanel = !globalVisibility.default.customizePanel ?? true;
                globalVisibility.right.customizePanel = false; /// Hide in other locations
                globalVisibility.left.customizePanel = false; /// Hide in other locations
                break;
        }

        ///Updates "globalVisibilityStore"
        globalVisibilityStore.set(globalVisibility);
        
    }



   
    // This was added to have hover property. If we return to add this idea this may be needed.
    // function getOffset(el) {
    //     const rect = el.getBoundingClientRect();
    //     return {
    //         left: rect.left + window.scrollX,
    //         top: rect.top + window.scrollY
    //     };
    // }


</script>

{#if onlyButton}

    {#if $globalEditorPreferencesStore.menuLocation == MenuLocations.TOP || $globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM}

    <Iconbutton active={$globalVisibilityStore.default.customizePanel == true || $globalVisibilityStore.right.customizePanel == true || $globalVisibilityStore.left.customizePanel == true} noBackground={true} on:click={toggleCustomizePanel}>
        <span slot="icon"><i class="bi bi-gear"></i></span>
    </Iconbutton>

    {:else}

    <Button active={$globalVisibilityStore.default.customizePanel == true || $globalVisibilityStore.right.customizePanel == true || $globalVisibilityStore.left.customizePanel == true} on:click={toggleCustomizePanel} horizontal={false} >

        <span slot="iconTop"><i class="bi bi-gear"></i></span>
        <span slot="text">Customize</span>

    </Button>

    {/if}


{:else}


    {#if $globalEditorPreferencesStore.customizePanelDisplayStyle == PanelDisplayStyles.HOVER}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("customizePanel")}
                {#if $globalVisibilityStore.default.customizePanel == true}
                    <div class="hoverPanel">
                        <Hover>
                            <Settings />
                        </Hover>
                    </div>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.customizePanelDisplayStyle == PanelDisplayStyles.FLOAT}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("customizePanel")}
                {#if $globalVisibilityStore.default.customizePanel == true}
                    <Floating>
                        <span slot="title" >Customize Editor</span>
                        <Settings />
                    </Floating>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.customizePanelDisplayStyle == PanelDisplayStyles.FIXEDLEFT}
        {#if $globalVisibilityStore.hasOwnProperty("left")}
            {#if $globalVisibilityStore.left.hasOwnProperty("customizePanel")}
                {#if $globalVisibilityStore.left.customizePanel == true}
                    <Fixed side="L">
                        <Settings />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.customizePanelDisplayStyle == PanelDisplayStyles.FIXEDRIGHT }
        {#if $globalVisibilityStore.hasOwnProperty("right")}
            {#if $globalVisibilityStore.right.hasOwnProperty("customizePanel")}
                {#if $globalVisibilityStore.right.customizePanel == true}
                    <Fixed side="R">
                        <Settings />
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