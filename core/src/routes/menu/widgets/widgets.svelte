<script>

   import { globalEditorPreferencesStore } from "../../globals/globalstores.js";

   /*
      THIS PAGE IS MAIN "WIDGETS" PAGE.
      THIS PAGE IS IMPORTED BY ALL VIEWS.
   */

   /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
   let globalEditorPreferences = $globalEditorPreferencesStore;
   /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
   $: globalEditorPreferencesStore.set(globalEditorPreferences);


   // TODO: import all modules dynamically

   import Div from "../../(modules)/widgets/div.svelte";
   import Text from "../../(modules)/widgets/text.svelte";

   /**
    * Definition and list of all modules in a JSON.
    * @returns {JSON}
    * 
    */
   const JsonOfModules = {
      "div": Div,
      "text": Text,
   };


</script>


<div class="widgetPanel " style='
   --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor};
   --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
   --fixedPanelButtonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
   --fixedPanelButtonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
   --fixedPanelButtonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
   --fixedPanelButtonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >
   <h2>Widgets</h2>
   <div class="w-full h-full flex items-start justify-center pt-3">

      <div class="w-full grid grid-cols-3 justify-items-center">
         <svelte:component this="{Div}" />
         <svelte:component this="{Text}" />
      </div>

      

   </div>

</div>

<style>

.widgetPanel{
   padding: 15px;
   width: 340px;
   height: 100vh;
   background-color: var(--fixedPanelBackgroundColor);
   color: var(--fixedPanelForegroundColor);
}

.tabButton{
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