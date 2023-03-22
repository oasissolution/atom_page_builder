<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Actual class
     * @type string
     */
    export let classInput;

    /**
     * Actual font Variant Numeric class
     * @type string
     */
    export let fontVariantNumeric;


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
    let fontVariantNumericOptions = [
        {name: "Default",               value: "",                      info: "Page Default"},
        {name: "Normal nums",           value: "normal-nums",           info: "font-variant-numeric: normal;\n\nUse the normal-nums propery to reset numeric font variants. This is usually useful for resetting a font feature at a particular breakpoint:"},
        {name: "Ordinal",               value: "ordinal",               info: "font-variant-numeric: ordinal;\n\nUse the ordinal utility to enable special glyphs for the ordinal markers."},
        {name: "Slashed zero",          value: "slashed-zero",          info: "font-variant-numeric: slashed-zero;\n\nUse the slashed-zero utility to force a 0 with a slash; this is useful when a clear distinction between O and 0 is needed."},
        {name: "Lining nums",           value: "lining-nums",           info: "font-variant-numeric: lining-nums;\n\nUse the lining-nums utility to use the numeric glyphs that are all aligned by their baseline. This corresponds to the lnum OpenType feature. This is the default for most fonts."},
        {name: "Oldstyle nums",         value: "oldstyle-nums",         info: "font-variant-numeric: oldstyle-nums;\n\nUse the oldstyle-nums utility to use numeric glyphs where some numbers have descenders. This corresponds to the onum OpenType feature."},
        {name: "Proportional nums",     value: "proportional-nums",     info: "font-variant-numeric: proportional-nums;\n\nUse the proportional-nums utility to use numeric glyphs that have proportional widths (rather than uniform/tabular). This corresponds to the pnum OpenType feature."},
        {name: "Tabular nums",          value: "tabular-nums",          info: "font-variant-numeric: tabular-nums;\n\nUse the tabular-nums utility to use numeric glyphs that have uniform/tabular widths (rather than proportional). This corresponds to the tnum OpenType feature."},
        {name: "Diagonal fractions",    value: "diagonal-fractions",    info: "font-variant-numeric: diagonal-fractions;\n\nUse the diagonal-fractions utility to replace numbers separated by a slash with common diagonal fractions. This corresponds to the frac OpenType feature."},
        {name: "Stacked fractions",     value: "stacked-fractions",     info: "font-variant-numeric: stacked-fractions;\n\nUse the stacked-fractions utility to replace numbers separated by a slash with common stacked fractions. This corresponds to the afrc OpenType feature. Very few fonts seem to support this feature."},
    ];


    /**
     * List of all font Variant Numeric classes
     * @type Array<string>
     */
    const fontVariantNumericList = [
        "normal-nums",
        "ordinal",
        "slashed-zero",
        "lining-nums",
        "oldstyle-nums",
        "proportional-nums",
        "tabular-nums",
        "diagonal-fractions",
        "stacked-fractions",
    ];

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function updateClass() {
        dispatch('updateClass');
    }

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;

    $: loaded, (()=>{
        if(loaded == true) {
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                fontVariantNumericList.forEach( elm => {
                    if(elm === currentClass) fontVariantNumeric = elm;
                });


            });
        }
    })();

    $: fontVariantNumeric, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "normal-nums":
                    case "ordinal":
                    case "slashed-zero":
                    case "lining-nums":
                    case "oldstyle-nums":
                    case "proportional-nums":
                    case "tabular-nums":
                    case "diagonal-fractions":
                    case "stacked-fractions":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontVariantNumeric;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the variant of numbers.">Font Variant Numeric</span>
    <Select options={fontVariantNumericOptions} bind:value={fontVariantNumeric}/>
</div>