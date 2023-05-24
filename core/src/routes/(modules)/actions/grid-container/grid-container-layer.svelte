<script>

/**
 * @type number
 */
export let rowCount;

/**
 * @type number
 */
export let colCount;

/**
 * @type HTMLElement
 */
export let bindElement;

/**
 * @type string
 */
export let uuid;


</script>

<input type="hidden" bind:this={bindElement} />


<div id="{uuid}" class="w-full h-96 bg-slate-500"> <!-- drag&drop || onselect -->

    <div class="grid grid-cols-12 grid-rows-6 gap-1 "> <!-- drag&drop || onselect? -->

    </div>

</div>