<script>
    import "../../../app.css";
    import { onMount, onDestroy } from "svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import { globalThemeStore, globalComponentCollectionStore, globalEditorPreferencesStore } from "../../globals/globalstores.js";
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { getComponent } from "../../globals/globalfunctions.js";
    import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { updateMainPanelFromEditor  } from "../../(shared)/shared/sharedfunctions.js";
    import { themeColors as DarkTheme } from "../../themes/dark.js";
    import { deleteComponent } from "../../(shared)/shared/sharedfunctions.svelte";
	import ActionHoverButton from "../../uicomponents/action-hover-button.svelte";
	import TextAlignment from "./textactions/text-alignment.svelte";
	import FontWeight from "./textactions/font-weight.svelte";
    import { writable } from "svelte/store";
	import FontSize from "./textactions/font-size.svelte";
	import TextDecoration from "./textactions/text-decoration.svelte";
	import VerticalAlignment from "./textactions/vertical-alignment.svelte";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on X axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginX = "0px";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on Y axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginY = "0px";

    /**
     * Width of "Actions" panel.
     */
    export const ActionsWidth = "256px";


    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    // $: $globalComponentCollectionStore, (()=>{
    //     globalComponentCollection = $globalComponentCollectionStore;
    // })();

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
    let elementDataLoaded;

    

    /**
     * Loads element data from JSON 
     */
    function loadElementData(source=""){

        // console.info("loadElementData Source : " + source);

        activeElement = getComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore);
        // activeElement = getComponent(globalComponentCollection, $globalSelectedElementUuidStore);

        // globalComponentCollection = $globalComponentCollectionStore;

        textInput = activeElement?.data?.text != undefined ? activeElement?.data?.text : "Lorem ipsum...";
        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";

        elementDataLoaded = classInput;

        if(activeElement == undefined){
            console.error("loadElementData() : activeElement is undefined!");
        }else if(activeElement == null){
            console.error("loadElementData() : activeElement is null!");
        }

        // console.log("text actions => loadElementData() => elementDataLoaded :\n" + elementDataLoaded);
        // console.log("loadElementData Source : " + source + " => elementDataLoaded : " + elementDataLoaded);
    }


    /////// IF WE UNCOMMENT THIS, IT GOES TO INFINITE LOOP. THAT'S WHY WE CAN NOT UPDATE THIS SIDE THIS WAY. INSTEAD (updateEditor() / ActionButton onHover )/loadElementData() DOES THIS FOR US.

    // let previousglobalComponentCollectionStore;
    // /**
    //  * Update ui whenever component collection changes (when there is a update in editor by actions panel)
    // */
    // $: $globalComponentCollectionStore, (() => {
    //     if(previousglobalComponentCollectionStore != $globalComponentCollectionStore){
    //         previousglobalComponentCollectionStore = $globalComponentCollectionStore;
    //         if(loaded == true){
    //             loadElementData();
    //         }
    //     }
        
    // })();

    /**
     * Update Editor Panel
     */
    function updateEditor(source=""){

        // console.log("updateEditor() : $globalComponentCollectionStore: \n" + JSON.stringify($globalComponentCollectionStore) + "\n\nglobalComponentCollection: \n" + JSON.stringify(globalComponentCollection));

        updateMainPanelFromEditor($globalComponentCollectionStore, $globalEditorPreferencesStore);
        // updateMainPanelFromEditor(globalComponentCollection, $globalEditorPreferencesStore);
        loadElementData("updateEditor() => " + source);
    }

    function updateClass(){

        // console.log("updateClass() : classInput: " + classInput + "\n\n");

        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput.replaceAll("undefined", "").trim();
                updateEditor("updateClass()");
            }else{
                console.error("updateClass(): activeElement.data is undefined or null!");
            }
        }else{
            console.error("updateClass(): activeElement is undefined!");
        }
    }


    let contentEditableActive = false;

    
    function editButtonPress(){
        // alert("Button clicked!");
        
        var item = $globalSelectedElementStore;

        if(contentEditableActive == false){
            item.setAttribute("contenteditable", true);
            contentEditableActive = true;
        }else{
            item.setAttribute("contenteditable", false);
            contentEditableActive = false;
            updatedWithOutClick = true;
            updateTextOnLostFocus(item, true, "editButtonPress()");
        }


    }

    let updatedWithOutClick = false;

    $: $globalSelectedElementStore, (()=>{

        if($globalSelectedElementStore != previousSelectedElement){
            if(updatedWithOutClick == false){
                updatedWithOutClick = true;
                updateTextOnLostFocus(previousSelectedElement, false, "$: $globalSelectedElementStore");
                updateEditor("updateTextOnLostFocus()");
            }
        }else{
            updatedWithOutClick = false;
        }

    })();


    function deleteButtonPressed(){
        if(contentEditableActive == false){
            deleteComponent($globalSelectedElementStore, $globalComponentCollectionStore);
            globalSelectedElementStore.set(null);
            globalSelectedElementUuidStore.set(null);
        }
    }

    let loaded = false;

    /**
     * @type number
     */
    let textAlignment=0;

    /**
     * @type number
     */
    let fontWeight=3;

    /**
     * @type number
     */
    let fontSize=2;
    
    /**
     * @type number
     */
    let textDecoration=0;

    /**
     * @type number
     */
    let verticalAlignment=0;

    /**
     * @type HTMLElement
     */
    let previousSelectedElement;


    /**
     * @param {HTMLElement} item
     */
    function updateTextOnLostFocus(item, updateManually=false, source=""){    
        if(item != undefined){
            // console.info("updateTextOnLostFocus source : " + source);
            var newText = item.innerHTML.replaceAll("<!--<Editortree>-->", "").trimStart(); //.replaceAll("  ", " ")
            var newString = item.innerText.trimStart(); //.replaceAll("  ", " ")
            // console.log(item.id + " | " + newText);
            if(contentEditableActive == true || updateManually == true){
                item.setAttribute("contenteditable", "false");
                contentEditableActive = false;

                var lastActiveElement = getComponent($globalComponentCollectionStore, item.id);
                // var lastActiveElement = getComponent(globalComponentCollection, item.id);
                
                if(lastActiveElement){
                    if(lastActiveElement.type){
                        if(lastActiveElement.data){

                            console.log(
                                "source : " + source + "\n" + 
                                "newString : " + newString + "\n" + 
                                "newText : " + newText + "\n" + 
                                "lastActiveElement.data.text : " + lastActiveElement.data.text + "\n" + 
                                "lastActiveElement.type : " + lastActiveElement.type
                            );

                            if(lastActiveElement.type == "text"){
                                updatedWithOutClick = true;
                                lastActiveElement.data.text = newText;
                                // updateMainPanelFromEditor($globalComponentCollectionStore, $globalEditorPreferencesStore);
                                updateEditor("updateTextOnLostFocus()");
                            }else{
                                console.warn("lastActiveElement.type != text");
                            }
                            
                        }else{
                            console.error("updateTextOnLostFocus(): activeElement.data is undefined or null!");
                        }
                    }
                    
                }else{
                    console.error("updateTextOnLostFocus(): activeElement is undefined! (" + item.id + ")");
                }
            }
        }    
        
    }

    onMount(() => {

        loadElementData("onMount");

        loaded = true;

        if($globalSelectedElementStore){
            previousSelectedElement = $globalSelectedElementStore;
            var item = $globalSelectedElementStore;
            contentEditableActive = item.contenteditable ?? false;
            // item.addEventListener("unfocus", updateTextOnLostFocus);
            
        }

    });

    onDestroy(()=>{
        // $globalSelectedElementStore.removeEventListener(updateTextOnLostFocus)

    });


    /**
     * Index of Active ActionHoverButton
     * @type number
     */
    export let activeButtonIndex=100; // 100 is set to prevent warning in console. There will be never 100 buttons in actions.


    function setTextBold(){
        editText("strong");
    }

    function setTextItalic(){
        editText("em");
    }

    function setTextUnderline(){
        editText("u");
    }

    /**
     * Use to apply tags to selected text in contenteditable active element
     * @param {string} tag
     */
    function editText(tag){

        var item = $globalSelectedElementStore;
        var lastActiveElement = getComponent($globalComponentCollectionStore, item.id);

        if(lastActiveElement != undefined){

            if(window.getSelection() != undefined && lastActiveElement.type == "text"){
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);

                var txt = item.innerHTML.replaceAll("<!--<Editortree>-->", "").trimStart(); //.replaceAll("  ", " ").trimStart()

                const before = txt.substr(0, range.startOffset);
                const after = txt.substr(range.endOffset);
                const selectedPart = txt.substr(range.startOffset,range.endOffset - range.startOffset );

                console.log(
                    "selection : " + selection?.toString() + "\n" + 
                    "txt : " + txt.length + " | " + txt + "\n" + 
                    "before : " + before.length + " | '" + before + "'\n" + 
                    "selectedPart : " + selectedPart.length + " | '" + selectedPart + "'\n" + 
                    "after : " + after.length + " | '" + after + "'\n" + 
                    "range : " + range.toString().length + " | " + range.toString() + "\n" + 
                    "range.startOffset : " + range.startOffset.toString() + "\n" + 
                    "range.endOffset : " + range.endOffset.toString() 
                );

                var leadingTag = "";
                var trailingTag = "";

                switch(tag){
                    case "strong":
                        leadingTag = "<strong>";
                        trailingTag = "</strong>";
                        break;
                    case "em":
                        leadingTag = "<em>";
                        trailingTag = "</em>";
                        break;
                    case "u":
                        leadingTag = "<u>";
                        trailingTag = "</u>";
                        break;
                }

                if(txt.includes(leadingTag) && txt.includes(trailingTag)){

                    var cond_before = "before.substr(" + before.length + " - " + leadingTag.length + " ) == \"" + leadingTag + "\" || \"" + before.substr(before.length - leadingTag.length) + "\"";
                    cond_before += before.substr(before.length - leadingTag.length) == leadingTag ? " => true" : " => false";

                    var cond_after = "after.substr(0, " + trailingTag.length + " ) == \"" + trailingTag + "\" || \"" + after.substr(0, trailingTag.length) + "\"";
                    cond_after += after.substr(0, trailingTag.length) == trailingTag ? " => true" : " => false";

                    console.log(cond_before);
                    console.log(cond_after);

                    if(
                        before.substr(before.length - leadingTag.length) == leadingTag &&
                        after.substr(0, trailingTag.length) == trailingTag
                    ){

                        item.innerHTML = (before + leadingTag + selectedPart + trailingTag + after);

                    }else{
                        item.innerHTML = (before + leadingTag + selectedPart + trailingTag + after);
                    }
                }else{
                    item.innerHTML = (before + leadingTag + selectedPart + trailingTag + after);
                }
                


            }

        }

    }

</script>



<div class="flex flex-row w-64 rounded-md gap-1 divide-x divide-black/40 place-content-start items-center content-start inlinePanel" 

style='
--fixedPanelBackgroundColor:{fixedPanelBackgroundColor};
--fixedPanelForegroundColor:{fixedPanelForegroundColor};
' >

    <div class="flex flex-row gap-1">
        <Iconbutton active={contentEditableActive} on:click={editButtonPress} noBackground buttonTitle="Edit Text"><span slot="icon"><i class="bi bi-pen"></i></span></Iconbutton>
    </div>

    {#if contentEditableActive == true}
        <div class="flex flex-row gap-1 relative align-middle items-center" class:invisible={!contentEditableActive} in:fly="{{ y: -40, duration: 700 }}" out:fly="{{ y: -40, duration: 300 }}" >
            <!-- <span class="align-middle items-center" title="Select text you want to edit">Edit :</span> -->
            <Iconbutton active={false} on:click={setTextBold} noBackground buttonTitle="Bold"><span slot="icon"><i class="bi bi-type-bold"></i></span></Iconbutton>
            <Iconbutton active={false} on:click={setTextItalic} noBackground buttonTitle="Italic"><span slot="icon"><i class="bi bi-type-italic"></i></span></Iconbutton>
            <Iconbutton active={false} on:click={setTextUnderline} noBackground buttonTitle="Underline"><span slot="icon"><i class="bi bi-type-underline"></i></span></Iconbutton>
        </div>
    {/if}

    {#if contentEditableActive == false}

    <div class="flex flex-row gap-1 relative" in:fly="{{ x: 200, duration: 800 }}" out:fly="{{ x: 200, duration: 100 }}" >

        <ActionHoverButton active={false} noBackground hoverPanelWidth={144} on:hoverButton={()=>loadElementData("Text Alignment")} bind:activeButtonIndex buttonTitle="Text Alignment">
            <span slot="icon"><i class="bi bi-justify"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <TextAlignment bind:textAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}  />
                </div>
            </span>
        </ActionHoverButton>

        <ActionHoverButton active={false} noBackground hoverPanelWidth={288} buttonIndex={1} on:hoverButton={()=>loadElementData("Font Weight")} bind:activeButtonIndex buttonTitle="Font Weight">
            <span slot="icon"><i class="bi bi-type-bold"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <FontWeight bind:fontWeight bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>
                </div>
            </span>
        </ActionHoverButton>

        <ActionHoverButton active={false} noBackground hoverPanelWidth={468} buttonIndex={2} on:hoverButton={()=>loadElementData("Font Size")} bind:activeButtonIndex buttonTitle="Font Size">
            <span slot="icon"><i class="bi bi-fonts"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <FontSize bind:fontSize bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>
                </div>
            </span>
        </ActionHoverButton>

        <ActionHoverButton active={false} noBackground hoverPanelWidth={180} buttonIndex={3} on:hoverButton={()=>loadElementData("Text Decoration")} bind:activeButtonIndex buttonTitle="Text Decoration">
            <span slot="icon"><i class="bi bi-type-underline"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <TextDecoration bind:textDecoration bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>
                </div>
            </span>
        </ActionHoverButton>

        <ActionHoverButton active={false} noBackground hoverPanelWidth={216} buttonIndex={4} on:hoverButton={()=>loadElementData("Vertical Alignment")} bind:activeButtonIndex buttonTitle="Vertical Alignment">
            <span slot="icon"><i class="bi bi-subscript"></i></span>
            <span slot="panel">
                <div class="inlinePanel rounded-md">
                    <VerticalAlignment bind:verticalAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>
                </div>
            </span>
        </ActionHoverButton>

    </div>

    <div in:fly="{{ x: 200, duration: 800 }}" out:fly="{{ x: 200, duration: 100 }}" >
        <Iconbutton active={false} on:click={deleteButtonPressed} noBackground buttonTitle="Delete Element"><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton>
    </div>

    {/if}

</div>


<style>

    .inlinePanel{
        background-color: var(--fixedPanelBackgroundColor);
        color: var(--fixedPanelForegroundColor);
    }

</style>