<script>
    import "../../../app.css";
	import { onDestroy, onMount } from "svelte";
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
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
     * @type HTMLElement
     */
    let bindElement;

    /**
     * @type HTMLElement
     */
    let bindElementActions;

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
                // console.log("Element selected : Div : "+uuid);
            }

            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
            if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
            if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
            if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
            if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
            if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
            if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

            // TODO: Update action buttons location
        }

    })();

    /// updates ui when selected changes
    $: selected, (() => {
        if(selected !== undefined && bindElement !== undefined){
            var _class_addons = "";
            if(selected == true){
                _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
            }
            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
        }
    })();

    /**
     * if mouse is in center then drop element inside.
     *
     * This variable holds what to do!
     * @type Writable<boolean>
     */
    let droppedInside = writable(true);

    /**
     * if mouse is in a area of "dropAreaLimit" px from left then drop before else drop after
     *
     * This variable holds what to do!
     * @type Writable<boolean>
     */
    let droppedBefore = writable(true);

    /**
     * This width is from left side of element. If mouse is in this limit then this means new dropped item will be before this element.
     * Otherwise element will be dropped inside.
     */
    const dropAreaLimit = 30;

    function dropped(e) {
        const types = e.dataTransfer.types;
        // execute function only when target container is different from source container
        if (bindElement.id !== e.target.id || types.includes('text/plain') === true) {
            cancelDefault(e);

            bindElement.classList.remove("outline-dashed");
            bindElement.classList.remove("outline-2");
            bindElement.classList.remove("outline-offset-2");
            bindElement.classList.remove("outline-teal-500");
            bindElement.classList.remove("border-l-4");
            bindElement.classList.remove("border-r-4");
            bindElement.classList.remove("border-teal-500");

            var typeOfTransfer = e.dataTransfer.getData('text/plain');
            if(!typeOfTransfer.toString().includes("element-")){
                /// Comes from inside of editor

                /// if mouse is in center then drop element inside.
                /// if mouse is in a area of 30 px from left then drop before.
                /// if mouse is in a area of 30 px from right then drop after.
                if(typeOfTransfer.toString() !== bindElement.id){
                    if($droppedInside == true){
                        // console.log("put " + typeOfTransfer.toString() + " inside " + bindElement.id);
                        /// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
                        replaceDroppedElementInside(typeOfTransfer.toString(), bindElement.id);
                    }else{
                        // console.log("replace " + typeOfTransfer.toString() + " before/after " + bindElement.id);
                        if($droppedBefore === true){
                            /// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
                            replaceDroppedElementBefore(typeOfTransfer.toString(), bindElement.id);
                        }else{
                            /// in this function typeOfTransfer is uuid of dragStart element. function works as this => to
                            replaceDroppedElementAfter(typeOfTransfer.toString(), bindElement.id);
                        }
                    }
                }

            }else{
                ///Comes from widgets panel
                if($droppedInside == true){
                    /// in this function typeOfTransfer is element type to create e.g. element-div, element-text, ...
                    createDroppedElementInside(uuid, typeOfTransfer);
                }else{
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
    }

    function dragOver(e) {
        cancelDefault(e);

        const types = e.dataTransfer.types;
        if (types.includes('text/plain')) { // && e.dataTransfer.getData('text/plain') === 'div'

            const rect = bindElement.getBoundingClientRect();

            // if(rect.width <= (2*dropAreaLimit)){
            //     /// if div has no childs, instead of calculating left/right, drop element inside directly.
            //     droppedInside.set(true);
            // }else{}
                if(((rect.left + dropAreaLimit ) < e.pageX && e.pageX < (rect.left + rect.width - dropAreaLimit)) && (rect.top <= e.pageY && e.pageY <= (rect.top + rect.height))){
                    /// if mouse is in center then drop element inside.
                    droppedInside.set(true);
                }else if((rect.left <= e.pageX && e.pageX <= (rect.left + dropAreaLimit)) && (rect.top <= e.pageY && e.pageY <= (rect.top + rect.height))){
                    droppedInside.set(false);
                    droppedBefore.set(true);
                }else if((rect.right >= e.pageX && e.pageX >= (rect.right - dropAreaLimit)) && (rect.top <= e.pageY && e.pageY <= (rect.top + rect.height))){
                    droppedInside.set(false);
                    droppedBefore.set(false);
                }
            

            /// if mouse is in center then drop element inside.
            /// if mouse is in a area of 30 px from left then drop before.
            /// if mouse is in a area of 30 px from right then drop after.

            if($droppedInside == true){
                bindElement.classList.add("outline-dashed");
                bindElement.classList.add("outline-2");
                bindElement.classList.add("outline-offset-2");
                bindElement.classList.add("outline-violet-500");
                bindElement.classList.remove("border-l-4");
                bindElement.classList.remove("border-r-4");
                bindElement.classList.remove("border-violet-500");
            }else{
                if($droppedBefore == true){
                    bindElement.classList.add("border-l-4");
                    bindElement.classList.remove("border-r-4");
                }else{
                    bindElement.classList.add("border-r-4");
                    bindElement.classList.remove("border-l-4");
                }
                bindElement.classList.add("border-violet-500");
                bindElement.classList.remove("outline-dashed");
                bindElement.classList.remove("outline-2");
                bindElement.classList.remove("outline-offset-2");
                bindElement.classList.remove("outline-violet-500");
            }

        }

    }

    function dragLeave(e) {

        bindElement.classList.remove("outline-dashed");
        bindElement.classList.remove("outline-2");
        bindElement.classList.remove("outline-offset-2");
        bindElement.classList.remove("outline-violet-500");

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

        if(data.accesskey           !== undefined) bindElement.setAttribute("accesskey",        data.accesskey);
        if(data.contenteditable     !== undefined) bindElement.setAttribute("contenteditable",  data.contenteditable);
        if(data.draggable           !== undefined) bindElement.setAttribute("draggable",        data.draggable);
        if(data.spellcheck          !== undefined) bindElement.setAttribute("spellcheck",       data.spellcheck.toString());
        if(data.tabindex            !== undefined) bindElement.setAttribute("tabindex",         data.tabindex.toString());

        var _class_addons = "";

        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons); // selectedBorder
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

        // if(data === undefined){
        //     bindElement.setAttribute("class", "w-[200px] h-[150px] flex place-content-center text-lg");
        //     bindElement.innerHTML = "This div is blank!";
        // }

        // function selectElement(){
        //     window.parent.postMessage(uuid, '*');
        // }

        // var m_pos;
        // function resize(e){
        //     var parent = bindElement.parentNode;
        //     var dx = m_pos - e.x;
        //     m_pos = e.x;
        //     parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
        // }


        // bindElement.addEventListener("mousedown", function(e){
        //     m_pos = e.x;
        //     document.addEventListener("mousemove", resize, false);
        // }, false);
        // document.addEventListener("mouseup", function(){
        //     document.removeEventListener("mousemove", resize, false);
        // }, false);

        // divZIndex = Number.isNaN(parseInt(bindElement.style.zIndex)) == false ? parseInt(bindElement.style.zIndex) + 5 : 5;
        // console.log('divZIndex = (parseInt('+bindElement.style.zIndex+') + 5).toString(); ==> divZIndex='+divZIndex);

        // jQuery(bindElement).droppable({
        //     drop: function(event, ui) {
        //         console.log("dropped");
        //     },
        //     over: function(event, ui) {
        //         console.log("drop over");
        //     },
        //     out: function(event, ui) {
        //         console.log("drop out");
        //     }
        // });

        bindElement.addEventListener("drop", dropped);
        bindElement.addEventListener("dragenter", cancelDefault);
        bindElement.addEventListener("dragover", dragOver);
        bindElement.addEventListener("dragleave", dragLeave);
        // bindElement.addEventListener('dragend', dragEnd);

        bindElement.addEventListener('dragstart', (event) => {
            /// if div itself is dragging
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
        /// Send selected uuid to main frame.
        sendSelectedElement(uuid);
        globalSelectedElementUuidStore.set(uuid);

        // update global variable, so selector activates.
        selectedElement = bindElement;
    }


</script>



<div bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement} on:dblclick={openOptionsPanel} class:blockUserSelect={childs.length == 0} draggable="true">

    <slot>
        <em class="text-slate-500 m-2">No content was provided</em>
    </slot>
    {#if childs.length == 0}

    <em class="text-slate-500 m-2">No content was provided</em>

    {/if}

</div>


<style>

    .blockUserSelect{
        /*
        To prevent user selecting inside the drag source
        */
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

</style>