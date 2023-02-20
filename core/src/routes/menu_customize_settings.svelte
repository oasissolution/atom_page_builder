<script>
   import { globalEditorPreferencesStore } from "./globalstores.js";

   import Menulocation from "./menu_customize_menulocation.svelte";
   import Panellocation from "./menu_customize_panellocation.svelte";
   import Theme from "./menu_customize_theme.svelte";

   /*
      THIS PAGE IS MAIN "CUSTOMIZE EDITOR" PAGE.
      THIS PAGE IS IMPORTED BY ALL VIEWS.
   */

   /**
    * Holds "globalEditorPreferencesStore" store as variable
    */
   let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
   /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
   $: globalEditorPreferencesStore.set(globalEditorPreferences);

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

<div class="customizePanel " style='
   --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor}; 
   --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
   --fixedPanelButtonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
    --fixedPanelButtonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
    --fixedPanelButtonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
    --fixedPanelButtonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >
   <h2 class="text-xl">Customize Editor</h2>
   <br/>
   <div class="flex flex-row gap-2">
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
   height: 42px;
   padding-left: 5px;
   padding-right: 5px;
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