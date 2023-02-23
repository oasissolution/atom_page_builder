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
     * Default string in the middle.
     * @type string
     */
    let text;


    onMount(() => {
        text = data.text !== undefined ? data.text : "";

    });
    

</script>

<div id="atomBody" data-uuid="{uuid}" >
    <slot>
        <div class="w-full h-full place-content-center">{text}</div>
    </slot>
</div>



<style>
    /* #atomBody{
        width: 100%;
        height: 100%;
    } */
</style>