<script>
    import "../../../app.css";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on X axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginX = "-6px";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on Y axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginY = "6px";





    function editButtonPress(){
        alert("Button clicked!");
    }

</script>

<div class="flex flex-row w-16 gap-1 divide-x divide-black/40 place-content-center items-center content-center">
    <div><button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black" on:click='{editButtonPress}'><i class="bi bi-plus w-5 h-5 text-black"></i></button></div>
    <div><button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black" on:click='{editButtonPress}'><i class="bi bi-three-dots-vertical w-5 h-5 text-black"></i></button></div>
    
    
</div>

