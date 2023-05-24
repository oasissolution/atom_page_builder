<script>
      import { globalEditorPreferencesStore, globalComponentCollectionStore, globalThemeStore } from "../../globals/globalstores.js";
      import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
      import { getTypeOfComponent } from "../../globals/globalfunctions.js";
      import { writable } from "svelte/store";

      /*
         THIS PAGE IS MAIN "WIDGET OPTIONS" PAGE.
         THIS PAGE IS IMPORTED BY ALL VIEWS.
      */

      /**
       * Holds "globalEditorPreferencesStore" store as variable
       */
      let globalEditorPreferences = $globalEditorPreferencesStore;
      /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
      $: globalEditorPreferencesStore.set(globalEditorPreferences);


      /**
       * Type of selected element
       * @type Writable<string>
       */
      let selectedType = writable("");

      $: $globalSelectedElementUuidStore, (updateOptionsPanel)();
      
      function updateOptionsPanel(){
         var type = getTypeOfComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore);
         // console.log("options type : " + type);
         selectedType.set(type);
      }

      
      
      // TODO: import all modules dynamically

      import Body from "../../(modules)/options/body.svelte";
      import Div from "../../(modules)/options/div.svelte";
      import Text from "../../(modules)/options/text.svelte";
      import GridContainer from "../../(modules)/options/grid-container.svelte";
      import EasySection from "../../(modules)/options/easy-section.svelte";


      /**
       * Definition and list of all modules in a JSON.
       * @returns {JSON}
       * 
       */
      const JsonOfModules = {
         "body": Body,
         "div": Div,
         "text": Text,
         "gridcontainer": GridContainer,
         "easysection": EasySection,
      };




   </script>

   <div class="widgetPanel overflow-y-auto" style='
   --fixedPanelBackgroundColor:{$globalThemeStore.panel.backgroundColor};
   --fixedPanelForegroundColor:{$globalThemeStore.panel.foregroundColor};
   --fixedPanelTitleColor:{$globalThemeStore.panel.titleColor};
   --fixedPanelTabsDivider: {$globalThemeStore.panel.tabsDivider};
   --collapseHeaderColor:{$globalThemeStore.panel.collapseHeaderColor};
   --backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
   --foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
   --borderColor: {$globalThemeStore.widgetIcon.borderColor};
   --iconColor: {$globalThemeStore.widgetIcon.iconColor};
   --textColor: {$globalThemeStore.widgetIcon.textColor};
' >
      <div class="widgetPanelTitle">Widget Options</div>
      {#if $selectedType != ""}

      <svelte:component this={JsonOfModules[$selectedType]}/>

      {/if}

   </div>

   <style>

   /* .customizePanel{
      padding: 15px;
      width: 316px;
      height: 100vh;
      background-color: var(--fixedPanelBackgroundColor);
      color: var(--fixedPanelForegroundColor);
   } */

   </style>