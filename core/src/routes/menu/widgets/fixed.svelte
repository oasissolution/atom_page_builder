<script>
    import { fade, fly } from 'svelte/transition';
    /**
    * @type string
    */
    export let side;

    // transition:fly="{{ x: side == "L" ? -320 : 320, duration: 300 }}"
</script>

<div>
    <slot></slot>
 </div>