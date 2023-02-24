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
     * @property class
     * @property dir
     * @property hidden
     * @property id
     * @property lang
     * @property style
     * @property title
     * @type JSON
     */
    export let data;


    /**
     * List of attributes
     * @type [
     *  "class", "dir", "hidden", "id", "lang", "style", "title"
     * ]
     */
    export const elAttr = ["class", "dir", "hidden", "id", "lang", "style", "title"];

    /*

    Attribute	Description

    class	    Specifies one or more class names for the element (used to reference the element in CSS)
    dir	        Specifies the direction of the element's text (left-to-right or right-to-left)
    hidden	    Specifies that the element should be hidden
    id	        Specifies a unique id for the element (used to reference the element in JavaScript)
    lang	    Specifies the language of the element's content
    style	    Specifies inline CSS for the element
    title	    Specifies extra information about the element (displayed as a tooltip)

    */


    /**
     * Default string in the middle.
     * @type string
     */
    let text;

    /**
     * @type HTMLElement
     */
    let bindElement;


    onMount(() => {
        // This is optional
        text = data.text !== undefined ? data.text : "";

        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class);
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden);
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

    });


</script>

<div id="atomBody" bind:this={bindElement} data-uuid="{uuid}" >
    <slot>
        <div class="w-full h-full flex align-middle justify-center content-center"><span class="">{text}</span></div>
    </slot>
</div>



<style>
    /* #atomBody{
        width: 100%;
        height: 100%;
    } */
</style>