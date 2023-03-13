<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    
    /**
     * Variable that adds class to element
     * @type string
     */
    export let addClass = "";

    /**
     * Value of element
     * @type string
     */
    export let text = "";


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    /**
     * Action on enter pressed.
     */
    function onSubmit() {
        dispatch('onSubmit');
    }

    function keyPress(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            onSubmit();
        }
    }

</script>


 <input type="text" class="inputtext rounded-lg p-2 mb-1 {addClass}" on:keypress={keyPress} bind:value={text} 
 style="
    --color:{$globalThemeStore.input.text.color};
    --backgroundColor:{$globalThemeStore.input.text.backgroundColor};
"  
 />


<style>

    .inputtext{
        background-color: var(--backgroundColor);
        color: var(--color);
        height: 32px;
    }

    .inputtext:focus{
        border: 1 px solid var(--color);
    }


</style>

