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

    let sliderValue = 100;
    
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

                if(currentClass.startsWith("brightness")){
                    property = currentClass;
                    sliderValue = parseInt((parseFloat(currentClass.replaceAll("brightness-[", "").replaceAll("]",""))*100).toString(),0);
                    innerLoad = true;
                    foundClass = true;
                }

            });
            if(foundClass==false) sliderValue=100;
        }
    })();

    $: property, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(cls.trim().startsWith("brightness")){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            if(property != "brightness-[1.00]"){ 
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
        property = "brightness-[" + (newValue/100).toFixed(2).toString() + "]";
    }

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for applying brightness filters to an element.">Brightness</span>
    <span class="w-[180px]"> <Slider value={sliderValue} min={0} max={200} on:change={e => updateSliderValue(e.detail.value)} /></span>
</div>
