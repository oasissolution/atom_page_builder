<script>
	import { onMount } from "svelte";

    import { globalEditorPreferencesStore, globalEditorViewStore, globalComponentCollectionStore, globalThemeStore, globalVisibilityStore } from "../globals/globalstores.js";
    import { globalSelectedElementUuidStore } from "../globals/selectorstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getComponent, addChildComponent, deleteComponent,
        replaceDroppedElementInside, replaceDroppedElementBefore, replaceDroppedElementAfter, createDroppedElementBefore, createDroppedElementAfter
    } from "../globals/globalfunctions.js";
    import { v4 as uuidv4 } from 'uuid';
    import swal from 'sweetalert';

    import Code from "../(editor)/editor/code.svelte";
    import Variables from "../(editor)/editor/variables.svelte";


    /**
     * @type HTMLIFrameElement
     */
    let editorFrame;


    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let globalSelectedElement = $globalSelectedElementUuidStore;
    $: globalSelectedElementUuidStore.set(globalSelectedElement);

    let buildType = globalEditorPreferences.build;

    let loaded = false;


    // $: $globalComponentCollectionStore, (() => {

    //     if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

    //         // console.log("Send data on globalComponentCollectionStore !");
    //         const data = {
    //             "message": {
    //                 "componentCollection": $globalComponentCollectionStore,
    //                 "editorPreferences": $globalEditorPreferencesStore,
    //                 "globalTheme": $globalThemeStore,
    //             }
    //         };
    //         if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
    //     }
    // })();


    function updateEditorFunction(){
        if(loaded == true && editorFrame !== null && editorFrame !== undefined ){

            // console.log("Send data on updateEditorFunction !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore,
                    "globalTheme": $globalThemeStore,
                }
            };
            if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
            // console.log("updateEditorFunction executed!");
        }
    }

    $: $globalComponentCollectionStore, (()=>{
        updateEditorFunction();
    })();

    $: $globalThemeStore, (()=>{
        updateEditorFunction();
    })();

    let previousSelectedHtmlElementUuid = "";


    /**
     * Sets selected element in JSON
     * @param {string} targetUuid uuid of selected element
     */
    function setSelectedElement(targetUuid){

        // console.log("Element Selected : " + targetUuid);

        /// if there is a selected element before, set as selected = false
        if(previousSelectedHtmlElementUuid != "") if(updateGlobalComponentCollectionStore(
            $globalComponentCollectionStore, //jsonData
            previousSelectedHtmlElementUuid, //uuid
            false, //newValue
            null, //dataTarget
            "selected", //target
            UpdateActionTypes.SET, //action
            "" //replace value
            ))
        {
            updateEditorFunction();
        }

        /// targetUuid is uuid of selected element. So set globally, that way we can use everywhere in our app 
        globalSelectedElement = targetUuid;

        /// set element as selected in JSON
        if(updateGlobalComponentCollectionStore(
            $globalComponentCollectionStore, //jsonData
            targetUuid, //uuid
            true, //newValue
            null, //dataTarget
            "selected", //target
            UpdateActionTypes.SET, //action
            "" //replace value
            ))
        {
            updateEditorFunction();
        }

        /// Set selected element as previous, so it will be easy to revert selection effects.
        previousSelectedHtmlElementUuid = targetUuid;
    }

    /**
     * Adds new dropped element to Json.
     * @param {string} targetUuid uuid of selected element
     * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
     */
    function createDroppedElementInside(targetUuid, elementType){

        const defaultData = {
            "uuid": uuidv4().toString(),
            "type": elementType.replace("element-",""),
            "data": {},
            "selected": false,
            "children": []
        };

        addChildComponent($globalComponentCollectionStore, targetUuid, defaultData);
        updateEditorFunction();
    }

    /**
     * Adds new dropped element to Json.
     * @param {string} targetUuid uuid of selected element
     * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
     */
    function createDroppedElementBeforeSub(targetUuid, elementType){

        const defaultData = {
            "uuid": uuidv4().toString(),
            "type": elementType.replace("element-",""),
            "data": {},
            "selected": false,
            "children": []
        };
        createDroppedElementBefore($globalComponentCollectionStore, defaultData, targetUuid);
        updateEditorFunction();
    }

    /**
     * Adds new dropped element to Json.
     * @param {string} targetUuid uuid of selected element
     * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
     */
    function createDroppedElementAfterSub(targetUuid, elementType){

        const defaultData = {
            "uuid": uuidv4().toString(),
            "type": elementType.replace("element-",""),
            "data": {},
            "selected": false,
            "children": []
        };
        createDroppedElementAfter($globalComponentCollectionStore, defaultData, targetUuid);
        updateEditorFunction();
    }




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

    function openOptionsPanel(){
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.optionPanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                var visible = globalVisibility.left.optionPanel ?? false;
                for(var key in globalVisibility.left) {
                    if(key == "optionPanel"){
                        globalVisibility.left[key] = true; // Always open - X !visible
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
                        globalVisibility.right[key] = true;
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.optionPanel = false; /// Hide in other locations
                globalVisibility.default.optionPanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.optionPanel = true;
                globalVisibility.right.optionPanel = false; /// Hide in other locations
                globalVisibility.left.optionPanel = false; /// Hide in other locations
                break;
        }

        ///Updates "globalVisibilityStore"
        globalVisibilityStore.set(globalVisibility);
    }

    onMount(()=>{

        ///Listen editor in iframe
        window.addEventListener('message', event => {

            if(event.data){
                // console.log("Gelen : " +JSON.stringify(event.data));
                switch(event.data.action){
                    case "selectElement":
                        setSelectedElement(event.data.data.uuid);
                        break;
                    case "createDroppedElementInside":
                        createDroppedElementInside(event.data.data.uuid, event.data.data.elementType);
                        break;
                    case "deleteElement":
                        deleteComponent($globalComponentCollectionStore, event.data.data.uuid);
                        updateEditorFunction();
                        break;
                    case "toggleWidgetsPanel":
                        toggleWidgetPanel();
                        break;
                    case "openOptionsPanel":
                        openOptionsPanel();
                        break;
                    case "replaceDroppedElementInside":
                        replaceDroppedElementInside($globalComponentCollectionStore, event.data.data.thisUuid, event.data.data.insideUuid);
                        updateEditorFunction();
                        break;
                    case "replaceDroppedElementBefore":
                        replaceDroppedElementBefore($globalComponentCollectionStore, event.data.data.thisUuid, event.data.data.beforeUuid);
                        updateEditorFunction();
                        break;
                    case "replaceDroppedElementAfter":
                        replaceDroppedElementAfter($globalComponentCollectionStore, event.data.data.thisUuid, event.data.data.afterUuid);
                        updateEditorFunction();
                        break;
                    case "createDroppedElementBefore":
                        createDroppedElementBeforeSub(event.data.data.beforeUuid, event.data.data.elementType);
                        break;
                    case "createDroppedElementAfter":
                        createDroppedElementAfterSub(event.data.data.afterUuid, event.data.data.elementType);
                        break;
                }

            }

        });

        loaded = true;

        // send stores in a {} to iframe
        editorFrame.addEventListener('load', () => {
            // console.log("Send data on load !");
            const data = {
                "message": {
                    "componentCollection": $globalComponentCollectionStore,
                    "editorPreferences": $globalEditorPreferencesStore,
                    "globalTheme": $globalThemeStore,
                }
            };
            if(editorFrame.contentWindow != null) editorFrame.contentWindow.postMessage(data, '*');
        });

        editorFrame.addEventListener("error", (e) => {

            swal({
                title: "Error on Main Panel",
                text: e.error.toString(),
                icon: "error",
            });
            
        });
       
    });

</script>



<div id="frame">

    {#if $globalEditorViewStore == EditorViews.PAGE}

    {#if buildType == "release"}
    <iframe id="editorFrame" bind:this={editorFrame} src="editor.html" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};'></iframe>
    {:else}
    <iframe id="editorFrame" bind:this={editorFrame} src="/editor" title="Editor" class=""  style='--editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};' ></iframe>
    {/if}
    {:else if $globalEditorViewStore == EditorViews.CODE }
    <svelte:component this={Code}/>
    {:else}
    <svelte:component this={Variables}/>
    {/if}

</div>


<style>

    #editorFrame{
        width: var(--editorWidth);
        height: 100vh;
    }

</style>