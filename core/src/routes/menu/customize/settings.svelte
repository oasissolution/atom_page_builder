<script>
   import { globalEditorPreferencesStore, globalThemeStore } from "../../globals/globalstores.js";

   import Menulocation from "./settings/menulocation.svelte";
   import Panellocation from "./settings/panellocation.svelte";
   import Theme from "./settings/theme.svelte";

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

<div class="widgetPanel" style='
--fixedPanelBackgroundColor:{$globalThemeStore.panel.backgroundColor};
--fixedPanelForegroundColor:{$globalThemeStore.panel.foregroundColor};
--fixedPanelTitleColor:{$globalThemeStore.panel.titleColor};
--fixedPanelTabsDivider: {$globalThemeStore.panel.tabsDivider};
--backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
--foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
--borderColor: {$globalThemeStore.widgetIcon.borderColor};
--iconColor: {$globalThemeStore.widgetIcon.iconColor};
--textColor: {$globalThemeStore.widgetIcon.textColor};
' >
   <div class="widgetPanelTitle">Customize Editor</div>
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



</style>