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
        widgetPanelSetUp();
        optionPanelSetUp();
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

    /**
     * Registers parameters needed by "Widgets Panel" to "globalVisibilityStore"
     */
    function widgetPanelSetUp(){
        let globalVisibility = globalVisibilityStore;
        let edited = false;
        if(globalVisibility.hasOwnProperty("left")){
            if(globalVisibility.left.hasOwnProperty("widgetPanel")){
                ///Do nothing
            }else{
                globalVisibility.left.widgetPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.left = {};
            globalVisibility.left.widgetPanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("right")){
            if(globalVisibility.right.hasOwnProperty("widgetPanel")){
                ///Do nothing
            }else{
                globalVisibility.right.widgetPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.right = {};
            globalVisibility.right.widgetPanel = false;
            edited = true;
        }
        if(globalVisibility.hasOwnProperty("default")){
            if(globalVisibility.default.hasOwnProperty("widgetPanel")){
                ///Do nothing
            }else{
                globalVisibility.default.widgetPanel = false;
                edited = true;
            }
        }else{
            globalVisibility.default = {};
            globalVisibility.default.widgetPanel = false;
            edited = true;
        }

        if(edited){
            globalVisibilityStore.set(globalVisibility);
        }
    }



    /**
     * Registers parameters needed by "Widget Options" panel to "globalVisibilityStore"
     */
    function optionPanelSetUp(){
        let globalVisibility = globalVisibilityStore;
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

</script>