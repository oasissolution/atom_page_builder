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
    export let value = "";

    /**
     * Fills background of select
     * @type boolean
     */
    export let filled = false;

    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

    /**
     * Value of element
     * @type Array<SelectOptions>
     */
    export let options;


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function onChange() {
        dispatch('onChange');
    }


</script>


<div class="box" class:rounded-lg={filled}
    style="
        --color:{$globalThemeStore.options.select.color};
        --backgroundColor:{filled == false ? $globalThemeStore.options.select.backgroundColor : $globalThemeStore.options.select.buttonBackgroundColor};
        --buttonBackgroundColor:{$globalThemeStore.options.select.buttonBackgroundColor};
        --hoverColor:{$globalThemeStore.options.select.hoverColor};
        --hoverBackgroundColor:{$globalThemeStore.options.select.hoverBackgroundColor};
    "
>
    <select bind:value={value} class="{addClass}" on:change={onChange} class:rounded-lg={filled} class:min-w-[150px]={!filled} class:px-2={filled}>

    {#each options as option}
        <option value="{option.value}" title="{option.info}">{option.name}</option>
    {/each}

    </select>
</div>


<style>


    .box {
        position: relative;
        height: 32px;
        color: var(--color);
        background-color: var(--backgroundColor);
    }

    .box select {
        appearance: none;
        outline: none;
        border: none;
        box-shadow: none;
        /* min-width: 150px; */
        height: 32px;
        padding-right: 32px;
        font-size: 16px;
        text-align: end;
        vertical-align: middle;
        color: var(--color);
        background-color: var(--backgroundColor);
    }

    .box::before {
        content: '\F229';
        font-family: "bootstrap-icons";
        padding-top: 5px;
        position: absolute;
        top: 5px;
        right: 5px;
        width: 22px;
        height: 22px;
        text-align: center;
        font-size: 12px;
        line-height: 12px;
        color: var(--color);
        background-color: var(--buttonBackgroundColor);
        pointer-events: none;
        border-radius: 4px;
        transition: .25s all ease;
    }

    .box:hover::before {
        color: var(--hoverColor);
        background-color: var(--hoverBackgroundColor);
    }

    .box select option {
        padding: 32px;
    }

    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }




</style>

