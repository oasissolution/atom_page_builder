<script>
    import { onMount } from "svelte";
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getDataFromComponent, getComponent } from "../../globals/globalfunctions.js";


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
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent(globalComponentCollection, $globalSelectedElementUuidStore);

        textInput = activeElement?.data?.text;
        classInput = activeElement?.data?.class;
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
     * Holds state of page load.
     * @type boolean
     */
    let loaded = false;

    /**
     * Update ui whenever uuid changes (new element selected)
    */
    $: $globalSelectedElementUuidStore, (() => {
        if(loaded == true){
            loadElementData();
        }
    })();


    onMount(() => {

        loaded = true;

    });





    function test(){
        console.log("From test: " + textInput);

        if(activeElement){
            if(activeElement.data){
                activeElement.data.text = textInput;
                updateEditor();
            }
        }

    }

    function setClass(){
        console.log("From div options: " + classInput);

        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput;
                updateEditor();
            }
        }

    }

</script>

    <div class="widgetPanelSubTitle">Text Options</div>
    <br/>
    {#if selectedTabPageIndex==0}
    <br/>

    <input type="text" on:change={test} bind:value={textInput}/>
    <br/><br/>
    <br/> Tailwind CSS
    <br/>

    <!-- <input type="text" on:change={test} bind:value={classInput}/> -->
    <textarea bind:value={classInput} rows="10"></textarea>
    <br/>
    <button class="h-10 px-6 font-semibold rounded-md bg-sky-400 text-white"  on:click={setClass}>Update</button>


    {:else if selectedTabPageIndex==1}
    Tab Page 2
    {/if}


