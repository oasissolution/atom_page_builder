<script>
    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Layers from "./layers.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../globals/globalstores.js";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";

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

    <Iconbutton active={$globalVisibilityStore.default.layerPanel == true || $globalVisibilityStore.right.layerPanel == true || $globalVisibilityStore.left.layerPanel == true} noBackground={true} on:click={toggleLayerPanel} >
        <span slot="icon"><i class="bi bi-stack"></i></span>
    </Iconbutton>

    <!-- {#if $globalVisibilityStore.default.layerPanel == true || $globalVisibilityStore.right.layerPanel == true || $globalVisibilityStore.left.layerPanel == true}

    <button class="iconButton selected" on:click={toggleLayerPanel} style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' ><i class="bi bi-stack"></i></button>

    {:else}
    <button class="iconButton" on:click={toggleLayerPanel} style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' ><i class="bi bi-stack"></i></button>
    {/if} -->


{:else}


    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.HOVER}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.default.layerPanel == true}
                    <div class="hoverPanel">
                        <Hover>
                            <Layers />
                        </Hover>
                    </div>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.layerPanelDisplayStyle == PanelDisplayStyles.FLOAT}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("layerPanel")}
                {#if $globalVisibilityStore.default.layerPanel == true}
                    <Floating>
                        <span slot="title" >Layers</span>
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
                    <Fixed>
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
                    <Fixed>
                        <Layers />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}

{/if}

<style>
    .iconButton{
        width: 32px;
        height: 32px;
        background-color: var(--buttonPassiveBackgroundColor);
        border-color: transparent;
        color: var(--buttonPassiveForegroundColor);
    }
    .iconButton.selected{
        background-color: var(--buttonActiveBackgroundColor);
        color: var(--buttonActiveForegroundColor);
        border-radius: 6px;
    }
    .hoverPanel{
        position: absolute;
        z-index: 888;

    }
</style>