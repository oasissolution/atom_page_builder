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
    alt	            Specifies alternative text for the image (displayed if the image cannot be loaded)
    border	        Specifies the border width of the image
    crossorigin	    Specifies whether the image should be loaded from a server that allows cross-origin requests
    height	        Specifies the height of the image
    ismap	        Specifies that the image is part of a server-side image map
    loading	        Specifies how the image should be loaded
    referrerpolicy	Specifies the policy for sending the Referer header when fetching the image
    sizes	        Specifies the sizes of the image, for responsive design
    src	            Specifies the URL of the image
    srcset	        Specifies multiple versions of the image, for responsive design
    usemap	        Specifies the name of a client-side image map to be used with the image
    width	        Specifies the width of the image

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