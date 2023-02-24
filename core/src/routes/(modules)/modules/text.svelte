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
    hidden	        Specifies that the element should be hidden
    id	            Specifies a unique id for the element (used to reference the element in JavaScript)
    lang	        Specifies the language of the element's content
    spellcheck	    Specifies whether the element should have its spelling and grammar checked
    style	        Specifies inline CSS for the element
    tabindex	    Specifies the tab order of the element
    title	        Specifies extra information about the element (displayed as a tooltip)

    */


    /**
     * Text of element
     * @type string
     */
    export let text;

    /**
     * @type HTMLElement
     */
    let bindElement;

    onMount(() => {
        text = data.text !== undefined ? data.text : "";

        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class);
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden);
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

        window.addEventListener("mousedown", (ev) => {
            if(ev.target !== bindElement){
                elementSelected = false;
            }
        });

    });

    let elementSelected = false;

    function selectElement(){
        window.parent.postMessage(uuid, '*');
        elementSelected = true;
    }

    console.log("Text displayed !");

</script>

<span bind:this={bindElement} data-uuid="{uuid}" class:atomDivSelected={elementSelected} on:mousedown|self={selectElement} >
    <slot>
        Default Text
    </slot>
    {text}
</span>


<style>

</style>