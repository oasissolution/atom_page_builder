<script>
    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Settings from "./settings.svelte";
	import Fixed from "./fixed.svelte";
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../globals/globalstores.js";

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
        ///Register variables first.
        customizePanelSetUp();

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest info
        switch($globalEditorPreferencesStore.customizePanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.customizePanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "customizePanel"){
                        globalVisibility.left[key] = !visible;
                    }else{
                        globalVisibility.left[key] = false;
                    }
                }
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                var visible = globalVisibility.right.customizePanel ?? false;
                for(var key in globalVisibility.right) {
                    if(key == "customizePanel"){
                        globalVisibility.right[key] = !visible;
                    }else{
                        globalVisibility.right[key] = false;
                    }
                }
                break;
            default:
                globalVisibility.default.customizePanel = !globalVisibility.default.customizePanel ?? true;
                break;
        }
        
        ///Updates "globalVisibilityStore"
        globalVisibilityStore.set(globalVisibility);
        
    }



   

    // function getOffset(el) {
    //     const rect = el.getBoundingClientRect();
    //     return {
    //         left: rect.left + window.scrollX,
    //         top: rect.top + window.scrollY
    //     };
    // }


</script>

{#if onlyButton}

    <button class="iconButton" on:click={toggleCustomizePanel} style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' ><i class="fa-solid fa-gear"></i></button>
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
                    <Fixed>
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
                    <Fixed>
                        <Settings />
                    </Fixed>
                {/if}
            {/if}
        {/if}
    {/if}

{/if}

<style>
    .iconButton{
        width: 32;
        height: 32;
        background-color: var(--buttonPassiveBackgroundColor);
        border-color: transparent;
        color: var(--buttonPassiveForegroundColor);
    }
    /* .iconButton.selected{
        background-color: var(--buttonActiveBackgroundColor);
        color: var(--buttonActiveForegroundColor);
        border-radius: 6px;
    } */
    .hoverPanel{
        position: absolute;
        z-index: 888;

    }
</style>