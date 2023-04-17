<script>
   import { globalEditorPreferencesStore, globalThemeStore } from "../../globals/globalstores.js";

   import Menulocation from "./settings/menulocation.svelte";
   import Panellocation from "./settings/panellocation.svelte";
   import Theme from "./settings/theme.svelte";

   import Optionsbutton from "../../uicomponents/optionsbutton.svelte";

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
   <div class="h-4"></div>

   <Optionsbutton items={["Locations", "Themes"]} bind:value={selectedTabPageIndex} spaceBetween={false} gap={"gap-3"}></Optionsbutton>

   <div class="widgetPanelTabsDivider"></div>

   {#if selectedTabPageIndex==0}

   <svelte:component this={Menulocation}/>
   <div class="widgetPanelDivider"></div>
   <svelte:component this={Panellocation}/>

   {:else if selectedTabPageIndex==1}
   
   <svelte:component this={Theme}/>

   {/if}

</div>

<style>



</style>