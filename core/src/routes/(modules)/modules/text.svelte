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