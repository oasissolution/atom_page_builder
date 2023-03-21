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
	import ContentFontSize from "./text/content-font-size.svelte";
	import ContentTextAlignment from "./text/content-text-alignment.svelte";
	import ContentVerticalAlignment from "./common/content-vertical-alignment.svelte";
	import LayoutPosition from "./common/layout-position.svelte";
	import LayoutFloat from "./common/layout-float.svelte";
	import LayoutOverflow from "./common/layout-overflow.svelte";
	import LayoutVisibility from "./common/layout-visibility.svelte";
	import LayoutZIndex from "./common/layout-z-index.svelte";
	import SpacingPadding from "./common/spacing-padding.svelte";
	import SpacingMargin from "./common/spacing-margin.svelte";


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
        htmlTag = activeElement?.data?.htmltag != undefined ? activeElement?.data?.htmltag : "span";

        elementDataLoaded = classInput;

    }

    /**
     * Call this function when selection changes. This is to fix; when switching between two text elements if one has not set a variable then recent
     * variable active is set to that element. If we clear variables and set to default, it will be upto loadElementData function.
     *
     * These are all default values of variables.
     */
    function clearOptionPanelVariables(){
        fontSize = "";
        textAlignment = 0;
        verticalAlignment = "";
        textInput = "Lorem ipsum...";
        classInput = "";
        layoutDisplay = "";
        layoutPosition = "";
        layoutFloat = 0;
        layoutOverflow = "";
        layoutVisibility = "";
        layoutZIndex = "";
        spacingPadding = "";
        spacingMargin = "";
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

    /**
     * Update ui whenever tap page changes
    */
    $: selectedTabPageIndex, (() => {
        clearOptionPanelVariables();
        if(loaded == true){
            loadElementData();
        }
    })();

    onMount(() => {

        loaded = true;

    });


    function updateText(){
        if(activeElement){
            if(activeElement.data){
                if(textInput != ""){
                    activeElement.data.text = textInput;
                }else{
                    textInput = "Lorem ipsum...";
                    activeElement.data.text = textInput;
                }
                updateEditor();
            }
        }
    }

    function updateClass(){
        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput;
                // classGlobal = classInput;
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
     * Actual font size class
     * @type string
     */
    let fontSize;

    /**
     * @type number
     */
    let textAlignment;

    /**
     * Vertical Alignment of element
     * @type string
     */
    let verticalAlignment;

    /**
     * Actual position class
     * @type string
     */
    export let layoutPosition;

    /**
     * @type number
     */
    export let layoutFloat;

    /**
     * @type string
     */
    export let layoutOverflow;

    /**
     * @type string
     */
    export let layoutVisibility;

    /**
     * @type string
     */
    export let layoutZIndex;

    /**
     * @type string
     */
    export let spacingPadding;

    /**
     * @type string
     */
    export let spacingMargin;

    
    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */


    /**
     * Standard HTML tags that are applied to text element.
     * @type Array<SelectOptions>
     */
    const htmlTags = [
        {name: "h1 (Heading 1)",   value: "h1",          info: "Heading 1"},
        {name: "h2 (Heading 2)",   value: "h2",          info: "Heading 2"},
        {name: "h3 (Heading 3)",   value: "h3",          info: "Heading 3"},
        {name: "h4 (Heading 4)",   value: "h4",          info: "Heading 4"},
        {name: "h5 (Heading 5)",   value: "h5",          info: "Heading 5"},
        {name: "h6 (Heading 6)",   value: "h6",          info: "Heading 6"},
        {name: "div",              value: "div",         info: "div"},
        {name: "span",             value: "span",        info: "span"},
        {name: "p (Paragraph)",    value: "p",           info: "Paragraph"},
        {name: "strong (Bold)",    value: "strong",      info: "Bold"},
    ];

    /**
     * Text of element
     * @type string
     */
    let htmlTag;

    $: htmlTag, (()=>{
        if(loaded == true) {

            if(activeElement){
                if(activeElement.data){
                    activeElement.data.htmltag = htmlTag;
                    updateEditor();
                }
            }

        }
    })();



    let collapseDesignLayout = false;
    function toggleDesignLayout(){
        collapseDesignLayout = !collapseDesignLayout;
    }

    let collapseDesignClass = false;
    function toggleDesignClass(){
        collapseDesignClass = !collapseDesignClass;
    }

    let collapseDesignTypography = false;
    function toggleDesignTypography(){
        collapseDesignTypography = !collapseDesignTypography;
    }

    let collapseDesignSpacing = false;
    function toggleDesignSpacing(){
        collapseDesignSpacing = !collapseDesignSpacing;
    }

    let collapseDesignSizing = false;
    function toggleDesignSizing(){
        collapseDesignSizing = !collapseDesignSizing;
    }

</script>

    <div class="widgetPanelSubTitle">Text Options</div>
    <div class="h-4"></div>

    <Optionsbutton items={["Content", "Design", "Animation"]} bind:value={selectedTabPageIndex}></Optionsbutton>

    <div class="widgetPanelTabsDivider"></div>

    {#if selectedTabPageIndex==0}

    <span class="mb-1">Text</span>
    <Textarea bind:text={textInput} on:onSubmit={updateText} ></Textarea>

    <div class="widgetPanelDivider"></div>

    <ContentFontSize bind:fontSize bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    <div class="widgetPanelDivider"></div>

    <ContentTextAlignment bind:textAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}  />

    <div class="widgetPanelDivider"></div>

    <ContentVerticalAlignment  bind:verticalAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    <div class="widgetPanelDivider"></div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Html container of text.">Html Tag</span>
        <Select options={htmlTags} bind:value={htmlTag}/>
    </div>

    <div class="widgetPanelDivider"></div>



 

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

        <SpacingPadding bind:spacingPadding bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SpacingMargin bind:spacingMargin bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>
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


        collapse panel
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignTypography}>
        <span class="collapseHeader">TYPOGRAPHY</span>
        {#if collapseDesignTypography}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignTypography}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >


        collapse panel
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>
    

    <button class="collapseButton" on:click={toggleDesignClass}>
        <span class="collapseHeader">CLASS</span>
        {#if collapseDesignClass}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignClass}
    <div class="w-full " in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <div class="mb-1 w-full flex items-end align-bottom place-content-between"><span class="">Class</span><span class="text-[10px]">Tailwind CSS</span></div>
        <Textarea bind:text={classInput} on:onSubmit={updateClass} readonly={true} ></Textarea>
        
        <pre class="text-[8px]">{JSON.stringify(activeElement, null, 2)}</pre>

    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    





    {:else if selectedTabPageIndex==2}

    <pre class="text-[8px]">{JSON.stringify(activeElement, null, 2)}</pre>
   
    {/if}


<style>




</style>