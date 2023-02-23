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

    onMount(() => {
        _class = data.class !== undefined ? data.class : "";
    });
    

</script>

<div class="{_class}" data-uuid="{uuid}" >
    <slot>
    <div class="w-full h-full place-content-center text-slate-300">This is a blank div!</div>
    </slot>
</div>


<style>

</style>