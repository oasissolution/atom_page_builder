<script>
   import { globalEditorPreferencesStore, globalVisibilityStore } from "../../globals/globalstores.js";
   import { PanelDisplayStyles, MenuLocations } from "../../globals/globalconstants.js";

   import Menulocation from "./settings/menulocation.svelte";
   import Panellocation from "./settings/panellocation.svelte";
   import Theme from "./settings/theme.svelte";

   let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
   $: globalEditorPreferencesStore.set(globalEditorPreferences);

   let selectedTabPageIndex = 0;

   function showPage(index){
      selectedTabPageIndex = index;
   }

</script>

<div class="customizePanel " style='
   --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor}; 
   --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
   --fixedPanelButtonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
    --fixedPanelButtonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
    --fixedPanelButtonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
    --fixedPanelButtonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >
   <h3>Customize Editor</h3>
   <br/>
   <div class="hstack gap-2">
      {#if selectedTabPageIndex==0}
      <button class="tabButton selected" on:click={() => showPage(0)}>Locations</button>
      {:else}
      <button class="tabButton" on:click={() => showPage(0)}>Locations</button>
      {/if}
      {#if selectedTabPageIndex==1}
      <button class="tabButton selected" on:click={() => showPage(1)}>Themes</button>
      {:else}
      <button class="tabButton" on:click={() => showPage(1)}>Themes</button>
      {/if}
   </div>
   <br/>
   {#if selectedTabPageIndex==0}
   <svelte:component this={Menulocation}/>
   <svelte:component this={Panellocation}/>
   {:else if selectedTabPageIndex==1}
   <svelte:component this={Theme}/>
   {/if}
   
</div>

<style>

.customizePanel{
   padding: 15px;
   width: 340px;
   height: 100vh;
   background-color: var(--fixedPanelBackgroundColor);
   color: var(--fixedPanelForegroundColor);
}

.tabButton{
   /* width: 32; */
   height: 42;
   background-color: var(--fixedPanelButtonPassiveBackgroundColor);
   border-color: transparent;
   color: var(--fixedPanelButtonPassiveForegroundColor);
}
.tabButton.selected{
   background-color: var(--fixedPanelButtonActiveBackgroundColor);
   color: var(--fixedPanelButtonActiveForegroundColor);
   border-radius: 6px;
}

</style>