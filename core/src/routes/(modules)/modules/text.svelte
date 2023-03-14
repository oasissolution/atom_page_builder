<script>
    import "../../../app.css";
	import { onMount, onDestroy } from "svelte";
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";
    import {
        sendSelectedElement,  openOptionsPanel,
        createDroppedElementInside, replaceDroppedElementInside,
        createDroppedElementBefore, replaceDroppedElementBefore,
        createDroppedElementAfter, replaceDroppedElementAfter,
    } from "../../(shared)/shared/sharedfunctions.js";
    import { writable } from "svelte/store";

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
     * Standard HTML tags that are applied to text element.
     * @type ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span", "p"]
     */
    export const htmlTags = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span", "p"];

    /**
     * Text of element
     * @type string
     */
     export let htmlTag = "span";

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
                bindElement.setAttribute("class", "text-lg italic text-slate-500");
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

    /**
     * if mouse is in left side of element from center then drop before else drop after
     *
     * This variable holds what to do!
     * @type Writable<boolean>
     */
    let droppedBefore = writable(true);

    function dropped(e) {
        const types = e.dataTransfer.types;
        // execute function only when target container is different from source container
        if (bindElement.id !== e.target.id || types.includes('text/plain') === true) {
            cancelDefault(e);
            bindElement.classList.remove("border-l-4");
            bindElement.classList.remove("border-r-4");
            bindElement.classList.remove("border-violet-500");

            /// Here we are going to put incoming element BEFORE/AFTER this element.

            var typeOfTransfer = e.dataTransfer.getData('text/plain');
            if(!typeOfTransfer.toString().includes("element-")){
                /// Comes from inside editor
                /// if it is not itself
                if(typeOfTransfer.toString() != bindElement.id){
                    // console.log("replace " + typeOfTransfer.toString() + " before " + bindElement.id);
                    if($droppedBefore === true){
                        /// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
                        replaceDroppedElementBefore(typeOfTransfer.toString(),bindElement.id);
                    }else{
                        /// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
                        replaceDroppedElementAfter(typeOfTransfer.toString(),bindElement.id);
                    }

                }

            }else{
                /// Comes from widgets panel
                /// Directly create new element BEFORE/AFTER this element.
                if($droppedBefore === true){
                    /// in this function typeOfTransfer is element type to create e.g. element-div, element-text, ...
                    createDroppedElementBefore(uuid, typeOfTransfer);
                }else{
                    /// in this function typeOfTransfer is element type to create e.g. element-div, element-text, ...
                    createDroppedElementAfter(uuid, typeOfTransfer);
                }
            }
        }
    }

    function dragOver(e) {
        cancelDefault(e);

        const types = e.dataTransfer.types;
        if (types.includes('text/plain')) { // && e.dataTransfer.getData('text/plain') === 'text'

            const rect = bindElement.getBoundingClientRect();

            const dropAreaLimit = Number.parseInt((rect.width / 2).toString(), 0);

            if((rect.left <= e.pageX && e.pageX <= (rect.left + dropAreaLimit)) && (rect.top <= e.pageY && e.pageY <= (rect.top + rect.height))){
                droppedBefore.set(true);
            }else if((rect.right >= e.pageX && e.pageX >= (rect.right - dropAreaLimit)) && (rect.top <= e.pageY && e.pageY <= (rect.top + rect.height))){
                droppedBefore.set(false);
            }

            if($droppedBefore == true){
                bindElement.classList.add("border-l-4");
                bindElement.classList.remove("border-r-4");
            }else{
                bindElement.classList.add("border-r-4");
                bindElement.classList.remove("border-l-4");
            }
            bindElement.classList.add("border-violet-500");
        }

    }

    function dragLeave(e) {
        bindElement.classList.remove("border-l-4");
        bindElement.classList.remove("border-r-4");
        bindElement.classList.remove("border-violet-500");
    }

    function dragEnd(e){
        e.dataTransfer.clearData();
    }

    function cancelDefault(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }


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


        bindElement.addEventListener("drop", dropped);
        bindElement.addEventListener("dragenter", cancelDefault);
        bindElement.addEventListener("dragover", dragOver);
        bindElement.addEventListener("dragleave", dragLeave);

        bindElement.addEventListener('dragstart', (event) => {
            if($globalSelectedElementStore.id == bindElement.id){
                event.dataTransfer.clearData();
                event.dataTransfer.setData('text/plain', bindElement.id);
            }
        });
    });

    onDestroy(() => {
        bindElement.removeEventListener("drop", dropped);
        bindElement.removeEventListener("dragenter", cancelDefault);
        bindElement.removeEventListener("dragover", dragOver);
        bindElement.removeEventListener("dragleave", dragLeave);
        // bindElement.removeEventListener('dragend', dragEnd);
    });

    function selectElement(){
        // window.parent.postMessage(uuid, '*');
        // elementSelected = true;
        sendSelectedElement(uuid);

        // update global variable, so selector activates
        selectedElement = bindElement;
    }


</script>

{#if htmlTag == "span"}
<span bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</span>

{:else if htmlTag == "div"}

<div bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</div>

{:else if htmlTag == "h1"}

<h1 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h1>

{:else if htmlTag == "h2"}

<h2 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h2>

{:else if htmlTag == "h3"}

<h3 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h3>

{:else if htmlTag == "h4"}

<h4 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h4>

{:else if htmlTag == "h5"}

<h5 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h5>

{:else if htmlTag == "h6"}

<h6 bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement}  on:dblclick={openOptionsPanel} draggable="true">
    <slot>
        This module can not reach here. But we keep it, hence all modules be in the same structure and tree works.
    </slot>
    {text}
</h6>



{/if}


<style>

</style>