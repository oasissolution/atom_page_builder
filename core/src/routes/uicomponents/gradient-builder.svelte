<!-- THIS FILE IS PART OF COLOR-BUILDER.SVELTE -->

<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";



    export let gradientDirection;    

    export let gradientClasses = writable([]);

    /**
     * @typedef thumbData
     * @property {string} color
     * @property {number} percent
     * @property {number} id
     */

    /**
     * @type Writable<Array<thumbData>>
     */
    let thumbs = writable([]);

    let innerClass = "bg-gradient-to-r from-[#6185ff] to-[#9c65ff]";

    onMount(()=>{
        
    });

    $: $gradientClasses, (()=>{
        var newClass = "bg-gradient-to-r";
        $gradientClasses.forEach( elm => {
            if(elm != "from-[0%]" && elm != "to-[100%]") newClass += " " + elm;
        });
        innerClass = newClass;
        convertGradientClassesToThumbs();
    })();

    function convertGradientClassesToThumbs(){
        var newArrayOfJson = [];
        var counter = 0;
        var stops = $gradientClasses; // Array of classes

        for(var i=0; i<stops.length; i++){

            if(stops[i].startsWith("from-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("from-")){
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": stops[i+1].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("from-[","").replace("]",""), "stop": stops[i].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("from-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("to-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("to-")){
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": stops[i+1].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("to-[","").replace("]",""), "stop": stops[i].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("to-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("via-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("via-")){
                        if(stops[i].startsWith("via-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("via-[","").replace("]",""), "stop": stops[i+1].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("via-[","").replace("]",""), "stop": stops[i].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }
                }
            }


        }

        thumbs.set(newArrayOfJson);

    }

    

</script>

<div class="w-full my-2">

    
    <div class="w-full h-8 relative">

        <div class="sliced"></div>

    </div>
    <div class="w-full h-8 rounded-md px-[13px]">
    <div class="h-8 rounded-md {innerClass}"></div></div>

    <span class="text-[10px]">{$gradientClasses.toString()}</span><br/>
    <span class="text-[10px]">{JSON.stringify($thumbs)}</span>

</div>




<style>


    .sliced {
        width: 26px;
        height: 26px;
        background-color: #fff;
        /* clip-path: polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%, 50% 0%); */
        clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%, 0% 0%);

    }


</style>