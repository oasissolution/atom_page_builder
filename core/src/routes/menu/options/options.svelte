<script>
      import { globalEditorPreferencesStore, globalComponentCollectionStore } from "../../globals/globalstores.js";
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

      // import Body from "../../(modules)/modules/body.svelte";
      import Div from "../../(modules)/options/div.svelte";
      import Text from "../../(modules)/options/text.svelte";


      /**
       * Definition and list of all modules in a JSON.
       * @returns {JSON}
       * 
       */
      const JsonOfModules = {
         // "body": Body,
         "div": Div,
         "text": Text,
      };




   </script>

   <div class="customizePanel " style='
      --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor};
      --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
      --fixedPanelButtonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
      --fixedPanelButtonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
      --fixedPanelButtonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
      --fixedPanelButtonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
   ' >
      <h3>Widget Options</h3>
      <br/>
      {#if $selectedType != ""}

      <svelte:component this={JsonOfModules[$selectedType]}/>
      
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
   
   :global().tabButton{
      height: 42;
      background-color: var(--fixedPanelButtonPassiveBackgroundColor);
      border-color: transparent;
      color: var(--fixedPanelButtonPassiveForegroundColor);
   }
   :global().tabButton.selected{
      background-color: var(--fixedPanelButtonActiveBackgroundColor);
      color: var(--fixedPanelButtonActiveForegroundColor);
      border-radius: 6px;
   }
   
   </style>