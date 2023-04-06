<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";

    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

    /**
     * Value of element
     *
     * This is final result
     *
     * @example
     * top-4        -top-4
     * top-[16px]   -top-[16px]
     * top-[1rem]   -top-[1rem]
     *
     * @type string
     */
    export let value = "";

    /**
     * Value of unit selection
     * @type string
     */
    let unitValue = "class";

    /**
     * Manually entered value where unitValue != "class"
     * @type string
     */
    let enteredValue = "";

    /**
     * Selected value where unitValue == "class"
     * @type string
     */
    let selectedValue = "";

    /**
     * Tailwind classes for css units
     * @type Array<SelectOptions>
     */
    export let unitClassOptions;

    /**
     * Letter at the start of input
     * @type string
     */
    export let leadingLetter;

    /**
     * Class of related distance to use where unitValue != "class"
     *
     * @example
     * "top", "right", "bottom", "left"
     * @type string
     */
    export let header;

    /**
     * Options to show where unitValue == "class"
     * @type Array<SelectOptions>
     */
    export let options;

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;

    /**
     * Checks if a string char is a number
     * @param {string} char
     * @returns {boolean}
     */
    function isNumber(char) {
        return /^\d$/.test(char);
    }

    $: loaded, (()=>{
        if(loaded == true) {

            elementDataLoaded.split(" ").forEach( cls => {

                /**
                 * Current class in elementDataLoaded array without leading and trailing spaces.
                 */
                var currentClass = cls.trim();

                /**
                 * Variable to determine selected unit from class definition.
                */
                var ctl = "";

                if(currentClass.startsWith(header)){
                    ctl=currentClass.replace(header+"-", "");
                    if(ctl.startsWith("[")){
                        ctl = ctl.replace("[","").replace("]","");
                        var i=0;
                        for(i=0; i<ctl.length-1; i++){
                            if(isNumber(ctl.charAt(i)) == false){
                                enteredValue = ctl.substring(0,i);
                                unitValue = ctl.substring(i);
                                break;
                            }
                        }
                    }else{
                        unitValue = "class";
                        selectedValue = currentClass; //if unitValue is class then rest must be class, eg. top-4 => removed "top-" => 4 is selected value
                    }
                    onSubChange();
                }

            });

        }
    })();


    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    function onChange() {
        dispatch('onChange');
    }

    function onSubChange(){
        if(unitValue == "class"){
            value = selectedValue;
        }else{
            value = header + "-[" + enteredValue + unitValue + "]";
        }
        onChange();
    }

    function keyPress(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            onSubChange();
        }
    }

    /**
     * Find info to show on hover for selected item.
     * @param {Array<SelectOptions>} opt
     * @param {string} search
     * @returns {string}
     */
    function findInfo(opt, search){

        opt.forEach(item => {
            if(item.value == search) return item.info;
        });

        return "";
    }

    onMount(()=>{

    });

</script>


<div class="box rounded-lg"
    style="
        --color:{$globalThemeStore.options.select.color};
        --backgroundColor:{$globalThemeStore.options.select.buttonBackgroundColor};
        --buttonBackgroundColor:{$globalThemeStore.options.select.buttonBackgroundColor};
        --hoverColor:{$globalThemeStore.options.select.hoverColor};
        --hoverBackgroundColor:{$globalThemeStore.options.select.hoverBackgroundColor};
        --textColor:{$globalThemeStore.input.text.color};
        --textBackgroundColor:{$globalThemeStore.input.text.backgroundColor};
    "
>

    <div class="flex flex-row min-w-[130px] h-8 pr-2">
        <div class="w-8 h-8 flex place-content-center items-center font-bold">{leadingLetter}</div>

        {#if unitValue=="class"}
            <select bind:value={selectedValue} on:change={onSubChange} class="flex flex-grow" title="{findInfo(options, selectedValue)}">

            {#each options as option}
                <option value="{option.value}" title="{option.info}">{option.name}</option>
            {/each}

            </select>
        {:else}
            <input type="text" class="inputtext flex flex-grow text-right p-2" on:keypress={keyPress} bind:value={enteredValue} />
        {/if}

        <div>
            <select bind:value={unitValue} on:change={onSubChange} class="w-10" title="{findInfo(unitClassOptions, unitValue)}">

            {#each unitClassOptions as option}
                <option value="{option.value}" title="{option.info}">{option.name}</option>
            {/each}

            </select>
        </div>
    </div>


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
        /* padding-right: 32px; */
        font-size: 16px;
        text-align: end;
        vertical-align: middle;
        color: var(--color);
        background-color: var(--backgroundColor);
    }

    /* .box::before {
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
    } */

    /* .box:hover::before {
        color: var(--hoverColor);
        background-color: var(--hoverBackgroundColor);
    } */

    /* .box select option {
        padding: 32px;
    } */

    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }

    .inputtext{
        background-color: var(--textBackgroundColor);
        color: var(--textColor);
        height: 32px;
        width: 50px;
        border: none;
    }

    .inputtext:focus{
        /* border: 1 px solid var(--textColor); */
        border: none;
    }


</style>

