<script>
    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Options from "./options.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore, globalHoverButton } from "../../globals/globalstores.js";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { MenuLocations } from "../../globals/globalconstants.js";
	import Button from "../../uicomponents/button.svelte";

    /**
     * Added for later use
     */
    export const componentName = "Options";

    /**
    * If true, returns button for menu bar.
    * If false, returns panel.
    *
    * @type Boolean
    */
    export let onlyButton = false;

    /**
     * Registers parameters needed by "Widget Options" panel to "globalVisibilityStore"
     *
     * Moved to root level loadvariables.svelte. But left here for any need later as a backup for now.
     */
    function optionPanelSetUp(){

        let globalVisibility = $globalVisibilityStore;
        let edited = false;
        if(globalVisibility.hasOwnProperty("left")){
            if(globalVisibility.left.hasOwnProperty("optionPanel")){
                ///Do nothing
            }else{
                globalVisibility.left.optionPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.left = {};
            globalVisibility.left.optionPanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("right")){
            if(globalVisibility.right.hasOwnProperty("optionPanel")){
                ///Do nothing
            }else{
                globalVisibility.right.optionPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.right = {};
            globalVisibility.right.optionPanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("default")){
            if(globalVisibility.default.hasOwnProperty("optionPanel")){
                ///Do nothing
            }else{
                globalVisibility.default.optionPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.default = {};
            globalVisibility.default.optionPanel = false;
            edited = true;
        }

        if(edited){
            globalVisibilityStore.set(globalVisibility);
        }
    }

    /**
     * Toggles visibility of "Widget Options" panel.
     */
    function toggleOptionPanel(){
        ///Register variables first. (Moved to root level loadvariables.svelte)
        // optionPanelSetUp();

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.optionPanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.optionPanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "optionPanel"){
                        globalVisibility.left[key] = !visible;
                    }else{
                        globalVisibility.left[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.right.optionPanel = false; /// Hide in other locations
                globalVisibility.default.optionPanel = false; /// Hide in other locations
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                var visible = globalVisibility.right.optionPanel ?? false;
                for(var key in globalVisibility.right) {
                    if(key == "optionPanel"){
                        globalVisibility.right[key] = !visible;
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.optionPanel = false; /// Hide in other locations
                globalVisibility.default.optionPanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.optionPanel = !globalVisibility.default.optionPanel ?? true;
                globalVisibility.right.optionPanel = false; /// Hide in other locations
                globalVisibility.left.optionPanel = false; /// Hide in other locations
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

    /**
     * @type HTMLButtonElement
     */
    let buttonHorizontal;
    /**
     * @type HTMLButtonElement
     */
    let buttonVertical;

   
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

    <Iconbutton  bind:bindElement={buttonHorizontal}  active={$globalVisibilityStore.default.optionPanel == true || $globalVisibilityStore.right.optionPanel == true || $globalVisibilityStore.left.optionPanel == true} 
    on:click={toggleOptionPanel} noBackground={true}
    clickOnHover={$globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.HOVER}>
        <span slot="icon"><i class="bi bi-sliders"></i></span>
    </Iconbutton>

    {:else}

    <Button  bind:bindElement={buttonVertical}  active={$globalVisibilityStore.default.optionPanel == true || $globalVisibilityStore.right.optionPanel == true || $globalVisibilityStore.left.optionPanel == true} 
    on:click={toggleOptionPanel} horizontal={false} 
    clickOnHover={$globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.HOVER} >

        <span slot="iconTop"><i class="bi bi-sliders"></i></span>
        <span slot="text">Options</span>

    </Button>

    {/if}

{:else}


    {#if $globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.HOVER}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("optionPanel")}
                {#if $globalVisibilityStore.default.optionPanel == true}
                    {#if $globalEditorPreferencesStore.menuLocation == MenuLocations.TOP || $globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM}
                        <Hover buttonOfContainer={$globalHoverButton} horizontal on:togglePanel={toggleOptionPanel}>
                            <Options />
                        </Hover>
                    {:else}
                        <Hover buttonOfContainer={$globalHoverButton} on:togglePanel={toggleOptionPanel}>
                            <Options />
                        </Hover>
                    {/if}
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.FLOAT}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("optionPanel")}
                {#if $globalVisibilityStore.default.optionPanel == true}
                    <Floating>
                        <!-- <span slot="title" >Widget Options</span> -->
                        <Options />
                    </Floating>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.FIXEDLEFT}
        {#if $globalVisibilityStore.hasOwnProperty("left")}
            {#if $globalVisibilityStore.left.hasOwnProperty("optionPanel")}
                {#if $globalVisibilityStore.left.optionPanel == true}
                    <Fixed side="L">
                        <Options />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.optionPanelDisplayStyle == PanelDisplayStyles.FIXEDRIGHT }
        {#if $globalVisibilityStore.hasOwnProperty("right")}
            {#if $globalVisibilityStore.right.hasOwnProperty("optionPanel")}
                {#if $globalVisibilityStore.right.optionPanel == true}
                    <Fixed side="R">
                        <Options />
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