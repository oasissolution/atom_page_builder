<script>

    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Widgets from "./widgets.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../globals/globalstores.js";
	import Button from "../../uicomponents/button.svelte";


    /**
     * Added for later use
     */
    export const componentName = "Widgets";

    /**
    * If true, returns button for menu bar.
    * If false, returns panel.
    *
    * @type Boolean
    */
    export let onlyButton = false;

    /**
     * Toggles visibility of "Widgets Panel" panel.
     */
    function toggleWidgetPanel(){

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.widgetPanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.widgetPanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "widgetPanel"){
                        globalVisibility.left[key] = !visible;
                    }else{
                        globalVisibility.left[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.right.widgetPanel = false; /// Hide in other locations
                globalVisibility.default.widgetPanel = false; /// Hide in other locations
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                var visible = globalVisibility.right.widgetPanel ?? false;
                for(var key in globalVisibility.right) {
                    if(key == "widgetPanel"){
                        globalVisibility.right[key] = !visible;
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.widgetPanel = false; /// Hide in other locations
                globalVisibility.default.widgetPanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.widgetPanel = !globalVisibility.default.widgetPanel ?? true;
                globalVisibility.right.widgetPanel = false; /// Hide in other locations
                globalVisibility.left.widgetPanel = false; /// Hide in other locations
                break;
        }

        ///Updates "globalVisibilityStore"
        globalVisibilityStore.set(globalVisibility);
        
    }

  

    let widgets = Widgets;

</script>


{#if onlyButton}

    <Button active={$globalVisibilityStore.default.widgetPanel == true || $globalVisibilityStore.right.widgetPanel == true || $globalVisibilityStore.left.widgetPanel == true} on:click={toggleWidgetPanel} >

        <span slot="iconLeft"><i class="bi bi-puzzle"></i></span>
        <span slot="text">Add Widget</span>

    </Button>

<!-- 
    {#if $globalVisibilityStore.default.widgetPanel == true || $globalVisibilityStore.right.widgetPanel == true || $globalVisibilityStore.left.widgetPanel == true}

    

    <button class="iconButton selected" on:click={toggleWidgetPanel} style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' ><i class="bi bi-puzzle"></i></button>

    {:else}
    <button class="iconButton" on:click={toggleWidgetPanel} style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' ><i class="bi bi-puzzle"></i></button>
    {/if} -->


{:else}


    {#if $globalEditorPreferencesStore.widgetPanelDisplayStyle == PanelDisplayStyles.HOVER}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("widgetPanel")}
                {#if $globalVisibilityStore.default.widgetPanel == true}
                    <div class="hoverPanel">
                        <Hover>
                            <Widgets />
                        </Hover>
                    </div>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.widgetPanelDisplayStyle == PanelDisplayStyles.FLOAT}
        {#if $globalVisibilityStore.hasOwnProperty("default")}
            {#if $globalVisibilityStore.default.hasOwnProperty("widgetPanel")}
                {#if $globalVisibilityStore.default.widgetPanel == true}
                    <Floating>
                        <span slot="title" >Widgets</span>
                        <Widgets />
                    </Floating>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.widgetPanelDisplayStyle == PanelDisplayStyles.FIXEDLEFT}
        {#if $globalVisibilityStore.hasOwnProperty("left")}
            {#if $globalVisibilityStore.left.hasOwnProperty("widgetPanel")}
                {#if $globalVisibilityStore.left.widgetPanel == true}
                    <Fixed>
                        <Widgets />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}


    {#if $globalEditorPreferencesStore.widgetPanelDisplayStyle == PanelDisplayStyles.FIXEDRIGHT }
        {#if $globalVisibilityStore.hasOwnProperty("right")}
            {#if $globalVisibilityStore.right.hasOwnProperty("widgetPanel")}
                {#if $globalVisibilityStore.right.widgetPanel == true}
                    <Fixed>
                        <Widgets />
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