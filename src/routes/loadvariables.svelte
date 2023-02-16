<script context="module">
    import { globalEditorPreferencesStore, globalVisibilityStore } from "./globals/globalstores.js";

    /*
        These functions run once on page load.
        Every menu item variable must be added here. 
    */

    /**
     * Load any needed variable
     */
    export function loadVariables(){
        customizePanelSetUp();
    }

    /**
     * Registers parameters needed by "Customize Editor" panel to "globalVisibilityStore"
     */
     function customizePanelSetUp(){
        let globalVisibility = globalVisibilityStore;
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

</script>