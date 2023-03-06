<script>
    import "../../../app.css";
	import { onMount } from "svelte";
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";


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

            if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
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
                // console.log("Element selected : Div : "+uuid);
            } 
            if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
        }
    })();

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
        
    });


    function selectElement(){
        /// Send selected uuid to main frame.
        window.parent.postMessage(uuid, '*');

        // update global variable, so selector activates.
        selectedElement = bindElement;
    }


</script>




    


<div bind:this={bindElement} id="{uuid}" on:mousedown|self={selectElement} >
   
    <slot> 
    <div class="w-full h-full place-content-center text-slate-300">This is a blank div!</div>
    </slot>

    <!-- <div class="bg-white rounded-md absolute top-2 right-2 w-16 h-7 p-0 m-0 z-20 atomDivCtl">
        <button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black atomDivCtl" on:click='{editButtonPress}'><i class="bi bi-pen w-5 h-5 text-black"></i></button>
    </div> -->


</div>

<!-- <div bind:this={bindElementActions} class="atomDivEditor" class:invisible={!elementSelected}>

    <slot> 
        <div class="w-full h-full place-content-center text-slate-300">This is a blank div!</div>
    </slot>

    <div class="bg-white rounded-md absolute top-2 right-2 w-16 h-7 p-0 m-0 z-20 atomDivCtl">
        <button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black atomDivCtl" on:click='{editButtonPress}'><i class="bi bi-pen w-5 h-5 text-black"></i></button>
    </div>

</div> -->




<style>

</style>