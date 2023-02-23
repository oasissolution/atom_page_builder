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
     * @type JSON
     */
    export let data;

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
     * class attribute of div element.
     * @type string
     */
    let _class;

    /**
     * Text of element
     * @type string
     */
    export let text;

    onMount(() => {
        _class = data.class !== undefined ? data.class : "";
        text = data.text !== undefined ? data.text : "";
    });


</script>

<span class="{_class}" data-uuid="{uuid}" >
    <slot>
        Default Text
    </slot>
    {text}
</span>


<style>

</style>