<script>
    import "../../../app.css";
	import { onMount } from "svelte";
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";
    import { sendSelectedElement, sendDroppedElement, openOptionsPanel } from "../../(shared)/shared/sharedfunctions.js";
    

    /**
     * uuid of element
     * @type string
     */
    export let uuid;

    /**
     * Control behaviour of element if element is selected.
     * @type boolean
     */
    export let selected;

     /**
     * Used to control behaviour of element if element has childs.
     * 
     * This variable has no usage in this element. BUT it is added to have identical definition of elements.
     * @type Array<JSON>
     */
    export let childs;

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
     * @type {AttrData}
     */ 
    export let data;

    /**
     * List of attributes
     * @type [
     *  "accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"
     * ]
     */
    export const elAttr = ["accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"];


    /**
     * Text of element
     * @type string
     */
    export let text;

    /**
     * @type HTMLElement
     */
    let bindElement;

    /**
     * @type HTMLElement
     */
    let selectedElement = $globalSelectedElementStore;
    //Update global data whenever selectedElement changes.
    $: globalSelectedElementStore.set(selectedElement);

    /// updates ui when data changes
    $: data, (() => {
        if(data !== undefined && bindElement !== undefined){
            if(data.accesskey           !== undefined) bindElement.setAttribute("accesskey",        data.accesskey);
            if(data.contenteditable     !== undefined) bindElement.setAttribute("contenteditable",  data.contenteditable);
            if(data.draggable           !== undefined) bindElement.setAttribute("draggable",        data.draggable);
            if(data.spellcheck          !== undefined) bindElement.setAttribute("spellcheck",       data.spellcheck.toString());
            if(data.tabindex            !== undefined) bindElement.setAttribute("tabindex",         data.tabindex.toString());

            var _class_addons = "";
            if(selected == true){
                _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
            } 

            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
            if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
            if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
            if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
            if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
            if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
            if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);
            
            text = data.text !== undefined ? data.text : "";

            if(data.text === undefined && data.class === undefined){
                text = "Lorem ipsum ...";
                bindElement.setAttribute("class", "flex place-content-center text-lg");
            }
        }
        
    })();

    /// updates ui when selected changes
    $: selected, (() => {
        if(selected !== undefined && bindElement !== undefined){
            var _class_addons = "";
            if(selected == true){
                _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
            } 
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
        }
    })();

    onMount(() => {
        text = data.text !== undefined ? data.text : "";

        if(data.accesskey           !== undefined) bindElement.setAttribute("accesskey",        data.accesskey);
        if(data.contenteditable     !== undefined) bindElement.setAttribute("contenteditable",  data.contenteditable);
        if(data.draggable           !== undefined) bindElement.setAttribute("draggable",        data.draggable);
        if(data.spellcheck          !== undefined) bindElement.setAttribute("spellcheck",       data.spellcheck.toString());
        if(data.tabindex            !== undefined) bindElement.setAttribute("tabindex",         data.tabindex.toString());

        var _class_addons = "";
        if(selected == true) _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";

        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

        // window.addEventListener("mousedown", (ev) => {
        //     if(ev.target !== bindElement){
        //         elementSelected = false;
        //     }
        // });

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'editor-text');
        });
    });

    // let elementSelected = false;

    function selectElement(){
        // window.parent.postMessage(uuid, '*');
        // elementSelected = true;
        sendSelectedElement(uuid);

        // update global variable, so selector activates
        selectedElement = bindElement;
    }

    // console.log("Text displayed !");

</script>

<!-- <div bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement} >
    <slot>
        Default Text
    </slot>
    {text}
    {#if text != null && text != undefined && text != ""}
        {text}
    {:else}
        Lorem ipsum ...
    {/if} 
</div> -->

<span bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        Default Text
    </slot>
    {text}
</span>


<style>

</style>