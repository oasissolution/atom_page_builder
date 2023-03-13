<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";

    /**
     * Variable that hold active state of element
     * @type boolean
     */
    export let checked;

    /**
     * Variable that hold active state of element
     * @type string
     */
    export let addClass = "";

    /**
     * @type number
     */
    export let width = 34;

    /**
     * @type number
     */
    export let height = 14;

    /**
     * @type number
     */
     export let sliderWidth = 18;

    /**
     * @type number
     */
    export let sliderHeight = 18;



    let offset = (sliderHeight - height)/-2;
    let travel = sliderHeight - 2 * offset;

</script>


<label class="switch"

style="
    --width:{width+"px"};
    --height:{height+"px"};
    --offset:{offset+"px"};
    --travel:{travel+"px"};
    --sliderWidth:{sliderWidth+"px"};
    --sliderHeight:{sliderHeight+"px"};
    --switchActiveColor:{$globalThemeStore.switch.active.color};
    --switchActiveBackgroundColor:{$globalThemeStore.switch.active.backgroundColor};
    --switchPassiveColor:{$globalThemeStore.switch.passive.color};
    --switchPassiveBackgroundColor:{$globalThemeStore.switch.passive.backgroundColor};
"  

>
    <input type="checkbox" bind:checked />
    <span class="slider" />
</label>


<style>

    .switch {
        position: relative;
        display: inline-block;
        width: var(--width);
        height: var(--height);
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--switchPassiveBackgroundColor);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: var(--height);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: var(--sliderHeight);
        width: var(--sliderWidth);
        left: var(--offset);
        bottom: var(--offset);
        background-color: var(--switchPassiveColor);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--switchActiveBackgroundColor);
    }

    input:checked + .slider {
        box-shadow: 0 0 1px var(--switchActiveBackgroundColor);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(var(--travel));
        -ms-transform: translateX(var(--travel));
        transform: translateX(var(--travel));
        background-color: var(--switchActiveColor);
    }





</style>