<script>
    import { onMount } from "svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalEditorPreferencesStore, globalComponentCollectionStore, globalThemeStore } from "../../globals/globalstores.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getDataFromComponent, getComponent } from "../../globals/globalfunctions.js";
    import Optionsbutton from "../../uicomponents/optionsbutton.svelte";
	import Textarea from "../../uicomponents/textarea.svelte";
	import Textinput from "../../uicomponents/textinput.svelte";
	import Select from "../../uicomponents/select.svelte";
	import LayoutDisplay from "./common/layout-display.svelte";
	import LayoutPosition from "./common/layout-position.svelte";
	import LayoutFloat from "./common/layout-float.svelte";
	import LayoutOverflow from "./common/layout-overflow.svelte";
	import LayoutVisibility from "./common/layout-visibility.svelte";
	import LayoutZIndex from "./common/layout-z-index.svelte";
	import SpacingPadding from "./common/spacing-padding.svelte";
	import SpacingMargin from "./common/spacing-margin.svelte";
	import SizingWidthHeight from "./common/sizing-width-height.svelte";
	import SizingWidthHeightMax from "./common/sizing-width-height-max.svelte";
	import SizingWidthHeightMin from "./common/sizing-width-height-min.svelte";
	import ContentColumns from "./div/content-columns.svelte";
	import FlexboxGridBasis from "./div/flexbox-grid-basis.svelte";
	import FlexboxGridFlexDirection from "./div/flexbox-grid-flex-direction.svelte";
	import FlexboxGridFlexWrap from "./div/flexbox-grid-flex-wrap.svelte";
	import FlexboxGridFlex from "./div/flexbox-grid-flex.svelte";
	import FlexboxGridFlexGrow from "./div/flexbox-grid-flex-grow.svelte";
	import FlexboxGridFlexShrink from "./div/flexbox-grid-flex-shrink.svelte";

    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

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
     * Used for sub elements to update themselves to current values.
     * @type string
    */
    let elementDataLoaded="";

    /**
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent(globalComponentCollection, $globalSelectedElementUuidStore);

        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";

        elementDataLoaded = classInput;
    }

    /**
     * Call this function when selection changes. This is to fix; when switching between two text elements if one has not set a variable then recent
     * variable active is set to that element. If we clear variables and set to default, it will be upto loadElementData function.
     *
     * These are all default values of variables.
     */
     function clearOptionPanelVariables(){
        classInput = "";
        layoutDisplay = "";
        layoutPosition = "";
        layoutFloat = 0;
        layoutOverflow = "";
        layoutVisibility = "";
        layoutZIndex = "";
        spacingPadding = "";
        spacingMargin = "";
        contentColumns = "";
        flexboxGridBasis = "";
        flexboxGridFlexDirection = "";
        flexboxGridFlexWrap = "";
        flexboxGridFlex = "";
        flexboxGridFlexGrow = "";
        flexboxGridFlexShrink = "";
    }

    /**
     * Update Editor Panel
     */
    function updateEditor(){
        const data = {
            "message": {
                "componentCollection": $globalComponentCollectionStore,
                "editorPreferences": $globalEditorPreferencesStore
            }
        };

        var elm = document.getElementById("editorFrame");
        if(elm != null) if(elm.contentWindow != null) elm.contentWindow.postMessage(data, '*');
    }


    /**
     * Integer variable that holds Tab Page Index.
     */
    let selectedTabPageIndex = 0;

    /**
     * Class Value of Div
     * @type string
     */
    let classInput;

    /**
     * Holds state of page load.
     * @type boolean
     */
    let loaded = false;

    /**
     * Update ui whenever uuid changes (new element selected)
    */
    $: $globalSelectedElementUuidStore, (() => {
        clearOptionPanelVariables();
        if(loaded == true){
            loadElementData();
        }
    })();


    onMount(() => {

        loaded = true;

    });


    function updateClass(){
        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput;
                updateEditor();
            }
        }
    }


    /**
     * Actual display class
     * @type string
     */
    let layoutDisplay;

    /**
     * Actual position class
     * @type string
     */
     let layoutPosition;

    /**
     * @type number
     */
    let layoutFloat;

    /**
     * @type string
     */
    let layoutOverflow;

    /**
     * @type string
     */
    let layoutVisibility;

    /**
     * @type string
     */
    let layoutZIndex;

    /**
     * @type string
     */
    let spacingPadding;

    /**
     * @type string
     */
    let spacingMargin;

    /**
     * @type string
     */
    let contentColumns;

    /**
     * @type string
     */
    let flexboxGridBasis;

    /**
     * @type string
     */
    let flexboxGridFlexDirection;

    /**
     * @type string
     */
    let flexboxGridFlexWrap;

    /**
     * @type string
     */
    let flexboxGridFlex;
    
    /**
     * @type string
     */
    let flexboxGridFlexGrow;

     /**
     * @type string
     */
    let flexboxGridFlexShrink;
    
    
    
    let collapseDesignLayout = false;
    function toggleDesignLayout(){
        collapseDesignLayout = !collapseDesignLayout;
    }

    let collapseDesignClass = false;
    function toggleDesignClass(){
        collapseDesignClass = !collapseDesignClass;
    }

    let collapseDesignSpacing = false;
    function toggleDesignSpacing(){
        collapseDesignSpacing = !collapseDesignSpacing;
    }

    let collapseDesignSizing = false;
    function toggleDesignSizing(){
        collapseDesignSizing = !collapseDesignSizing;
    }

    let collapseDesignFlexboxGrid = false;
    function toggleDesignFlexboxGrid(){
        collapseDesignFlexboxGrid = !collapseDesignFlexboxGrid;
    }



</script>
    <div class="widgetPanelSubTitle">Container Options</div>
    <div class="h-4"></div>

    <Optionsbutton items={["Content", "Design", "Animation"]} bind:value={selectedTabPageIndex}></Optionsbutton>

    <div class="widgetPanelTabsDivider"></div>
    
    {#if selectedTabPageIndex==0}
    
    <ContentColumns bind:property={contentColumns} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />


    {:else if selectedTabPageIndex==1}
    
    <button class="collapseButton" on:click={toggleDesignLayout}>
        <span class="collapseHeader">LAYOUT</span>
        {#if collapseDesignLayout}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignLayout}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <LayoutDisplay bind:layoutDisplay bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>

        <div class="widgetPanelDivider"></div>

        <LayoutPosition bind:layoutPosition bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutFloat bind:layoutFloat bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutOverflow bind:layoutOverflow bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutVisibility bind:layoutVisibility bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutZIndex bind:layoutZIndex bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div> <!-- collapseDesignLayout -->
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignSpacing}>
        <span class="collapseHeader">SPACING</span>
        {#if collapseDesignSpacing}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignSpacing}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <SpacingPadding bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SpacingMargin bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <!-- <div class="widgetPanelDivider"></div> -->
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignSizing}>
        <span class="collapseHeader">SIZING</span>
        {#if collapseDesignSizing}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignSizing}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <SizingWidthHeight bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SizingWidthHeightMax bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SizingWidthHeightMin bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignFlexboxGrid}>
        <span class="collapseHeader">FLEXBOX & GRID</span>
        {#if collapseDesignFlexboxGrid}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignFlexboxGrid}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <FlexboxGridBasis bind:property={flexboxGridBasis} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FlexboxGridFlexDirection bind:property={flexboxGridFlexDirection} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FlexboxGridFlexWrap bind:property={flexboxGridFlexWrap} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FlexboxGridFlex bind:property={flexboxGridFlex} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FlexboxGridFlexGrow bind:property={flexboxGridFlexGrow} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
        
        <div class="widgetPanelDivider"></div>

        <FlexboxGridFlexShrink bind:property={flexboxGridFlexShrink} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>


    {/if}


