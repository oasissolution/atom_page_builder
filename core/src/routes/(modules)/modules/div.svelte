<script>
    import "../../../app.css";
	import { onMount } from "svelte";

    /**
     * uuid of element
     * @type string
     */
    export let uuid;

    /**
     * Required data to fill attr of html elements
     * @property accesskey
     * @property class
     * @property contenteditable
     * @property dir
     * @property draggable
     * @property hidden
     * @property id
     * @property lang
     * @property spellcheck
     * @property style
     * @property tabindex
     * @property title
     * @type JSON
     */
    export let data;

    /**
     * List of attributes
     * @type [
     *  "accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"
     * ]
     */
    export const elAttr = ["accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"];


    /*
    Attribute	    Description

    accesskey	    Specifies a shortcut key to activate the element
    class	        Specifies one or more class names for the element (used to reference the element in CSS)
    contenteditable	Specifies whether the content of the element can be edited by the user
    data-*	        Used to store custom data private to the page or application
    dir	            Specifies the direction of the element's text (left-to-right or right-to-left)
    draggable	    Specifies whether the element is draggable
    hidden	        Specifies that the element should be hidden
    id	            Specifies a unique id for the element (used to reference the element in JavaScript)
    lang	        Specifies the language of the element's content
    spellcheck	    Specifies whether the element should have its spelling and grammar checked
    style	        Specifies inline CSS for the element
    tabindex	    Specifies the tab order of the element
    title	        Specifies extra information about the element (displayed as a tooltip)

    */


    /**
     * @type HTMLElement
     */
    let bindElement;


    onMount(() => {

        if(data.accesskey           !== undefined) bindElement.setAttribute("accesskey",        data.accesskey);
        if(data.contenteditable     !== undefined) bindElement.setAttribute("contenteditable",  data.contenteditable);
        if(data.draggable           !== undefined) bindElement.setAttribute("draggable",        data.draggable);
        if(data.spellcheck          !== undefined) bindElement.setAttribute("spellcheck",       data.spellcheck);
        if(data.tabindex            !== undefined) bindElement.setAttribute("tabindex",         data.tabindex);


        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + " atomDiv");
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden);
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);



        // jQuery(bindElement)
        //     .on("mouseover", (e) => {
        //         var target = e.target;
        //         if(target.id != "atomBody"){
        //             jQuery(target).addClass("hovered");
        //             // setSelectedElement(jQuery(target).attr("class"));
        //             window.parent.postMessage(jQuery(target).attr("class"), '*');
        //         }
        //     }).on("mouseout", (e) => {
        //         var target = e.target;
        //         jQuery(target).removeClass("hovered");

        //     });

        
    });

    function blankFunction(){

    }

</script>

<input type="hidden" class="atomDiv" />

<div bind:this={bindElement} data-uuid="{uuid}" on:mousedown={window.parent.postMessage(bindElement.getAttribute("class"), '*')} >
    <slot>
    <div class="w-full h-full place-content-center text-slate-300">This is a blank div!</div>
    </slot>
</div>


<style>

    .atomDiv{
        border: none;
    }

    .atomDiv:hover {
        border: 2px solid aqua;
    }


</style>