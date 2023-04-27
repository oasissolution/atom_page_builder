<script>
    import "../../../app.css";
    import { onMount } from "svelte";
    import { globalThemeStore, globalComponentCollectionStore, globalEditorPreferencesStore } from "../../globals/globalstores.js";
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { getComponent } from "../../globals/globalfunctions.js";
    import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { openOptionsPanel, sendDeletedElement, refreshEditorData, updateMainPanelFromEditor  } from "../../(shared)/shared/sharedfunctions.js";
    import { themeColors as DarkTheme } from "../../themes/dark.js";
    import swal from 'sweetalert';
    import { deleteComponent } from "../../(shared)/shared/sharedfunctions.svelte";
	import ActionHoverButton from "../../uicomponents/action-hover-button.svelte";
	import TextAlignment from "./textactions/text-alignment.svelte";
	import { writable } from "svelte/store";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on X axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginX = "-6px";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on Y axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginY = "0px";

    /**
     * Width of "Actions" panel.
     */
    export const ActionsWidth = "160px";




    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    /**
     * @type string
     */
     let fixedPanelBackgroundColor;
    /**
     * @type string
     */
    let fixedPanelForegroundColor;
    
    if(globalThemeStore != undefined && $globalThemeStore != undefined){
        fixedPanelBackgroundColor = $globalThemeStore.panel.backgroundColor;
        fixedPanelForegroundColor = $globalThemeStore.panel.foregroundColor;
    }else{
        try {
            globalThemeStore.set(DarkTheme);
            fixedPanelBackgroundColor = $globalThemeStore.panel.backgroundColor;
            fixedPanelForegroundColor = $globalThemeStore.panel.foregroundColor;
        } catch (error) {
            fixedPanelBackgroundColor = "#242425";
            fixedPanelForegroundColor = "#9F9F9F";
            console.warn("Text Actions : globalThemeStore is undefined! Falling back to defaults.");
        }

    }

    /**
     * Required data to fill attributes of HTML elements
     * @typedef {Object} AttrData
     * @property {string} [accesskey] - Specifies a shortcut key to activate the element
     * @property {string} [class] - Specifies one or more class names for the element (used to reference the element in CSS)
     * @property {string} [contenteditable] - Specifies whether the content of the element can be edited by the user
     * @property {string} [dir] - Specifies the direction of the element's text (left-to-right or right-to-left)
     * @property {string} [draggable] - Specifies whether the element is draggable
     * @property {boolean} [hidden] - Specifies that the element should be hidden
     * @property {string} [id] - Specifies a unique id for the element (used to reference the element in JavaScript)
     * @property {string} [lang] - Specifies the language of the element's content
     * @property {boolean} [spellcheck] - Specifies whether the element should have its spelling and grammar checked
     * @property {string} [style] - Specifies inline CSS for the element
     * @property {number} [tabindex] - Specifies the tab order of the element
     * @property {string} [title] - Specifies extra information about the element (displayed as a tooltip)
     * @property {string} [text] - Value of Text Element
     * @property {string} [htmltag] - HTML Tag of Text Element
     */

    /**
     * Data of Atom Element
     * @typedef {Object} ElementData
     * @property {string} [uuid] - Unique id of element.
     * @property {string} [type] - Type of element
     * @property {boolean} [selected] - Specifies whether the element is selected.
     * @property {AttrData} [data] - Element specific data.
     * @property {Array<JSON>} [children] - Child elements.
     */

    /**
     * All data of element
     * @type {ElementData | null}
     */
    let activeElement;

    /**
     * Text Input Value
     * @type string
     */
    let textInput;

    /**
     * Class Value of Text
     * @type string
     */
    let classInput;

    /**
     * Used for sub elements to update themselves to current values.
     * @type string
    */
    let elementDataLoaded="";

    /**
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent(globalComponentCollection, $globalSelectedElementUuidStore);

        textInput = activeElement?.data?.text != undefined ? activeElement?.data?.text : "Lorem ipsum...";
        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";

        elementDataLoaded = classInput;

        if(activeElement == undefined){
            console.error("loadElementData() : activeElement is undefined!");
            // console.info("globalComponentCollection : \n"+JSON.stringify(globalComponentCollection));
            // console.info("globalSelectedElementUuidStore : "+JSON.stringify($globalSelectedElementUuidStore));
        }else if(activeElement == null){
            console.error("loadElementData() : activeElement is null!");
        }
        // console.log("loadElementData() : classInput: " + classInput);
    }

    /**
     * Update Editor Panel
     */
     function updateEditor(){
        // console.info("updateEditor(): globalComponentCollection : \n"+JSON.stringify(globalComponentCollection));
        // console.info("updateEditor(): globalEditorPreferencesStore : \n"+JSON.stringify($globalEditorPreferencesStore));
        // console.info("updateEditor(): globalSelectedElementUuidStore : "+JSON.stringify($globalSelectedElementUuidStore));

        updateMainPanelFromEditor(globalComponentCollection, $globalEditorPreferencesStore);

    }

    function updateClass(){

        // console.log("updateClass() : classInput: " + classInput);

        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput.replaceAll("undefined", "").trim();
                updateEditor();
            }else{
                console.error("updateClass(): activeElement.data is undefined or null!");
            }
        }else{
            console.error("updateClass(): activeElement is undefined!");
        }
    }


    function editButtonPress(){
        alert("Button clicked!");
    }


    function deleteButtonPressed(){
        deleteComponent($globalSelectedElementStore, $globalComponentCollectionStore);
        globalSelectedElementStore.set(null);
    }

    let loaded = false;

    /**
     * @type number
     */
    let textAlignment;

    onMount(() => {

        loadElementData();

        loaded = true;

    });

</script>

<div class="flex flex-row w-40 rounded-md gap-1 divide-x divide-black/40 place-content-center items-center content-center inlinePanel" style='
--fixedPanelBackgroundColor:{fixedPanelBackgroundColor};
--fixedPanelForegroundColor:{fixedPanelForegroundColor};
' >

    <div class="flex flex-row gap-1">
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-pen"></i></span></Iconbutton>
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-files"></i></span></Iconbutton>
    </div>

    <div class="flex flex-row gap-1 relative">
        <ActionHoverButton active={false} noBackground hoverPanelWidth={160}>
            <span slot="icon"><i class="bi bi-justify"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <TextAlignment bind:textAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}  />
                </div>
            </span>
        </ActionHoverButton>
    </div>

    <div>
        <Iconbutton active={false} on:click={deleteButtonPressed} noBackground><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton>
    </div>
    
</div>


<style>

    .inlinePanel{
        background-color: var(--fixedPanelBackgroundColor);
        color: var(--fixedPanelForegroundColor);
    }

</style>