<script>
    import Layerstree from "./layerstree.svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalThemeStore } from "../../globals/globalstores.js";

      /*
         THIS PAGE IS MAIN "LAYERS" PAGE.
         THIS PAGE IS IMPORTED BY ALL VIEWS.
      */

      /**
       * Holds "globalEditorPreferencesStore" store as variable
       */
      let globalEditorPreferences = $globalEditorPreferencesStore;
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
--backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
--foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
--borderColor: {$globalThemeStore.widgetIcon.borderColor};
--iconColor: {$globalThemeStore.widgetIcon.iconColor};
--textColor: {$globalThemeStore.widgetIcon.textColor};
' >
<div class="widgetPanelTitle">Layers</div>

<br/>

{#each $globalComponentCollectionStore as component}
   <Layerstree {component} let:component>
      <span class="align-middle">{component.type}</span> <span class="text-[8px] align-middle">{component.uuid}</span>
   </Layerstree>
{/each}

</div>


<style>

   /* .layerPanel{
      padding: 15px;
      width: 316px;
      height: 100vh;
      background-color: var(--fixedPanelBackgroundColor);
      color: var(--fixedPanelForegroundColor);
   } */

</style>