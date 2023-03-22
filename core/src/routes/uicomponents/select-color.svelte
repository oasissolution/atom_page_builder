<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import ColorPicker from 'svelte-awesome-color-picker';

    /**
     * Value of element
     *
     * This is final result
     *
     * @example
     * text-[#50d71e]
     * 
     * bg-[#252525]
     *
     * @type string
     */
    export let value = "";

    /**
     * Manually entered hex value
     * @type string
     */
    let enteredValue = "";

    /**
     * Class of related element 
     *
     * @example
     * "text", "bg"
     * @type string
     */
    export let header;

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;


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

                if(currentClass.startsWith(header+"-")){
                    ctl=currentClass.replace(header+"-", "");
                    if(ctl.startsWith("[#")){
                        ctl = ctl.replace("[#","").replace("]","");
                        enteredValue = "#" + ctl;   
                        value = header + "-[#" + ctl + "]";
                        onChange();
                    }
                    
                }

            });

        }
    })();


    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    function onChange() {
        dispatch('onChange');
    }


    function keyPress(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            if(enteredValue != ""){
                value = header + "-[" + enteredValue + "]";
                onChange();
            }
        }
    }

    onMount(()=>{

    });

    /**
     * Updates selected color
     * @param {CustomEvent} event This event fires from "ColorPicker"
     */
     function setColor(event){
        var {hsv, rgb, hex, color} = event.detail;
        enteredValue = hex;
        value = header + "-[" + hex + "]";
        onChange();
    }

</script>


<div class="box rounded-lg"
    style="
        --color:{$globalThemeStore.input.selectColor.color};
        --backgroundColor:{$globalThemeStore.input.selectColor.backgroundColor};
    "
>

    <div class="flex flex-row min-w-[130px] h-8 pr-2 place-content-start items-center">

        <div class="h-4 flex place-content-center items-center font-bold">
            <ColorPicker 
                label={enteredValue}
                hex={enteredValue} 
                on:input={(event) => setColor(event)}
            />
        </div> 
        <!-- <div class="w-4 h-8 flex place-content-center items-center font-bold">#</div> -->
        <!-- <input type="text" class="inputtext flex flex-grow text-right p-2" on:keypress={keyPress} bind:value={enteredValue} /> -->

      
    </div>


</div>


<style>


    .box {
        position: relative;
        height: 32px;
        color: var(--color);
        background-color: var(--backgroundColor);
    }


    .inputtext{
        background-color: var(--backgroundColor);
        color: var(--color);
        height: 32px;
        width: 50px;
        border: none;
    }

    .inputtext:focus{
        border: none;
    }


</style>

