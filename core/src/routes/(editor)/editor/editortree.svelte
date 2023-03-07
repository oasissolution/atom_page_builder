<script>
    export let component;
    export let JsonOfModules;

</script>

<slot/>
    


{#each component?.children ?? [] as child}
    <svelte:component this={JsonOfModules[child.type]} data={child.data} uuid={child.uuid} selected={child.selected} >
        <svelte:self component={child} JsonOfModules={JsonOfModules} >
            <!-- <slot component={child} />  -->
        
        </svelte:self>
    </svelte:component>
{/each}

