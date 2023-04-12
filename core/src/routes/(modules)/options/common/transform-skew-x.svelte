<script>

    import "../../../../app.css";
    import Slider from "../../../uicomponents/slider.svelte";

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
     * Actual part of class
     * @type string
     */
    export let property; 

    let sliderValue = 0;
    
    let innerLoad = false;

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
        if(loaded == true) {// && innerLoad == false
            var foundClass = false;
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                if(currentClass.startsWith("skew-x")){
                    property = currentClass;
                    sliderValue = parseInt(currentClass.replaceAll("skew-x-[", "").replaceAll("deg]",""),0);
                    innerLoad = true;
                    foundClass = true;
                }

            });
            if(foundClass==false) sliderValue=0;
        }
    })();

    $: property, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(cls.trim().startsWith("skew-x")){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            if(property != "skew-x-[0deg]"){ 
                classInput = newClass.trim() + " " + property; 
            }else{
                classInput = newClass.trim();
            }
            
            updateClass();
        }
    })();

 
    /**
     * 
     * @param {number} newValue
     */
    function updateSliderValue(newValue){
        property = "skew-x-[" + newValue.toString() + "deg]";
    }

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for skewing elements with transform. X Axis / Horizontally">Skew X</span>
    <span class="w-[180px]"> <Slider value={sliderValue} min={0} max={360} on:change={e => updateSliderValue(e.detail.value)} /></span>
</div>
