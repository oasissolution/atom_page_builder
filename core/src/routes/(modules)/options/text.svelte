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

    // /**
    //  * Global class collection in this file.
    //  * @type string
    //  */
    // let classGlobal;

    // $: classGlobal, (()=>{
    //     if(activeElement && loaded){
    //         if(activeElement.data){
    //             activeElement.data.class = classGlobal;
    //             if(classInput != classGlobal) classInput = classGlobal;
    //             updateEditor();
    //         }
    //     }
    // })();

    /**
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent(globalComponentCollection, $globalSelectedElementUuidStore);

        textInput = activeElement?.data?.text != undefined ? activeElement?.data?.text : "Lorem ipsum...";
        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";
        htmlTag = activeElement?.data?.htmltag != undefined ? activeElement?.data?.htmltag : "span";

        classInput.split(" ").forEach( cls => {

            var currentClass = cls.trim();

            fontSizeList.forEach( fs => {
                if(fs === currentClass) fontSize = fs;
            });

            textAlignmentList.forEach ( ta => {
                if(ta === currentClass) textAlignment = textAlignmentList.indexOf(ta) ?? 0;
            });

            verticalAlignmentList.forEach( va => {
                if(va === currentClass) verticalAlignment = va;
            });
            

        });



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
     * Shows selected page.
     * @param {number} index New page index to show.
     */
    function showPage(index){
        selectedTabPageIndex = index;
    }

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
     * TextArea to edit class
     * @type HTMLTextAreaElement
     */
    let classTextArea;

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
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

    /**
     * Value of element
     * @type Array<SelectOptions>
     */
    let fontSizeOptions = [
        {name: "Default",   value: "",          info: "Page Default"},
        {name: "X-Small",   value: "text-xs",   info: "font-size: 0.75rem; /* 12px */"},
        {name: "Small",     value: "text-sm",   info: "font-size: 0.875rem; /* 14px */"},
        {name: "Base",      value: "text-base", info: "font-size: 1rem; /* 16px */"},
        {name: "Large",     value: "text-lg",   info: "font-size: 1.125rem; /* 18px */"},
        {name: "X-Large",   value: "text-xl",   info: "font-size: 1.25rem; /* 20px */"},
        {name: "2X-Large",  value: "text-2xl",  info: "font-size: 1.5rem; /* 24px */"},
        {name: "3X-Large",  value: "text-3xl",  info: "font-size: 1.875rem; /* 30px */"},
        {name: "4X-Large",  value: "text-4xl",  info: "font-size: 2.25rem; /* 36px */"},
        {name: "5X-Large",  value: "text-5xl",  info: "font-size: 3rem; /* 48px */"},
        {name: "6X-Large",  value: "text-6xl",  info: "font-size: 3.75rem; /* 60px */"},
        {name: "7X-Large",  value: "text-7xl",  info: "font-size: 4.5rem; /* 72px */"},
        {name: "8X-Large",  value: "text-8xl",  info: "font-size: 6rem; /* 96px */"},
        {name: "9X-Large",  value: "text-9xl",  info: "font-size: 8rem; /* 128px */"},
    ];

    /**
     * Actual font size class
     * @type string
     */
    let fontSize;

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const fontSizeList = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-8xl", "text-9xl",];

    $: fontSize, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "text-xs":
                    case "text-sm":
                    case "text-base":
                    case "text-lg":
                    case "text-xl":
                    case "text-2xl":
                    case "text-3xl":
                    case "text-4xl":
                    case "text-5xl":
                    case "text-6xl":
                    case "text-7xl":
                    case "text-8xl":
                    case "text-9xl":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontSize;
            updateClass();
        }
    })();



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


    /**
     * @type number
     */
    let textAlignment = 0;


    /**
     * List of all font size classes
     * @type Array<string>
     */
    const textAlignmentList = ["text-left", "text-center", "text-right", "text-justify"];

    $: textAlignment, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "text-left":
                    case "text-center":
                    case "text-right":
                    case "text-justify":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + textAlignmentList[textAlignment];
            updateClass();
        }
    })();


    /**
     * Vertical Alignment of element
     * @type string
     */
    let verticalAlignment;

    /**
     * Vertical alignment options
     * @type Array<SelectOptions>
     */
    const verticalAlignmentOptions = [
        {name: "Default",       value: "",                  info: "Page Default"},
        {name: "Baseline",      value: "align-baseline",    info: ""},
        {name: "Top",           value: "align-top",         info: ""},
        {name: "Middle",        value: "align-middle",      info: ""},
        {name: "Bottom",        value: "align-bottom",      info: ""},
        {name: "Text top",      value: "align-text-top",    info: ""},
        {name: "Text bottom",   value: "align-text-bottom", info: ""},
        {name: "Sub",           value: "align-sub",         info: ""},
        {name: "Super",         value: "align-super",       info: ""},
    ];

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const verticalAlignmentList = ["align-baseline", "align-top", "align-middle", "align-bottom", "align-text-top", "align-text-bottom", "align-sub", "align-super",];


    $: verticalAlignment, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "align-baseline":
                    case "align-top":
                    case "align-middle":
                    case "align-bottom":
                    case "align-text-top":
                    case "align-text-bottom":
                    case "align-sub":
                    case "align-super":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + verticalAlignment;
            updateClass();
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

</script>

    <div class="widgetPanelSubTitle">Text Options</div>
    <div class="h-4"></div>

    <Optionsbutton items={["Content", "Design", "Animation"]} bind:value={selectedTabPageIndex}></Optionsbutton>

    <div class="widgetPanelTabsDivider"></div>

    {#if selectedTabPageIndex==0}

    <span class="mb-1">Text</span> 
    <Textarea bind:text={textInput} on:onSubmit={updateText} ></Textarea>

    <div class="widgetPanelDivider"></div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling the font size of an element.">Font Size</span>
        <Select options={fontSizeOptions} bind:value={fontSize}/>
    </div>

    <div class="widgetPanelDivider"></div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling the alignment of text.">Alignment</span>
        <div class="w-[130px]">
            <Optionsbutton items={['bi bi-text-left', 'bi bi-text-center', 'bi bi-text-right', 'bi bi-justify']} icons={true} bind:value={textAlignment}></Optionsbutton>
        </div>
    </div>

    <div class="widgetPanelDivider"></div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling the vertical alignment of an inline element.">V. Alignment</span>
        <Select options={verticalAlignmentOptions} bind:value={verticalAlignment}/>
    </div>

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