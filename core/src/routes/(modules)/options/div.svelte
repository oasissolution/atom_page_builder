<script>

    /**
     * Integer variable that holds Tab Page Index.
     */
    let selectedTabPageIndex = 0;

    /**
     * Shows selected page.
     * @param {number} index New page index to show.
     */
    function showPage(index){
        selectedTabPageIndex = index;
    }


</script>


    Div Options
    <br/>
    {#if selectedTabPageIndex==0}
    Tab Page 1
    {:else if selectedTabPageIndex==1}
    Tab Page 2
    {/if}


