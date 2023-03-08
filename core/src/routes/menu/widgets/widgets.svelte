<script>

   import { globalEditorPreferencesStore, globalThemeStore } from "../../globals/globalstores.js";

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
   --fixedPanelBackgroundColor:{$globalThemeStore.panel.backgroundColor};
   --fixedPanelForegroundColor:{$globalThemeStore.panel.foregroundColor};
   --fixedPanelTitleColor:{$globalThemeStore.panel.titleColor};
   --backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
   --foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
   --borderColor: {$globalThemeStore.widgetIcon.borderColor};
   --iconColor: {$globalThemeStore.widgetIcon.iconColor};
   --textColor: {$globalThemeStore.widgetIcon.textColor};
' >
   <div class="widgetPanelTitle">Widgets</div>

   <div class="w-full h-full flex items-start justify-center pt-3">

      <div class="w-full grid grid-cols-3 justify-items-center">
         <svelte:component this="{Div}" />
         <svelte:component this="{Text}" />
      </div>

   </div>

   <div class="hidden">
      <div class="widgetContainer">
      <div class="widgetIcon"></div>
      <div class="widgetText"></div></div>
   </div>
</div>


<style>

   :global(.widgetPanel){
      padding: 15px;
      width: 316px;
      height: 100vh;
      background-color: var(--fixedPanelBackgroundColor);
      color: var(--fixedPanelForegroundColor);
   }

   :global(.widgetPanelTitle){
      display: flex;
      width: 100%;
      place-content: center;
      font-size: 1.25rem/* 20px */;
      line-height: 1.75rem/* 28px */;
      font-weight: 600;
      color: var(--fixedPanelTitleColor) !important;
      margin-bottom: 8px;
   }

   :global(.widgetPanelSubTitle){
      display: flex;
      width: 100%;
      place-content: center;
      font-weight: 500;
      color: var(--fixedPanelForegroundColor) !important;
   }

   :global(.widgetContainer){
      width: 80px;
      height: 80px;
      display: block;
      align-items: center;
      justify-items: center;
      place-items: center;
      place-content: center;
      border: 1px solid var(--borderColor) !important;
      border-radius: 14px;
      padding-top: 8px;
      background-color: var(--backgroundColor) !important;
      color: var(--foregroundColor) !important;
   }

   :global(.widgetContainer .widgetIcon){
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-items: center;
      place-items: center;
      place-content: center;
      font-size:x-large;
      color: var(--iconColor) !important;
   }

   :global(.widgetContainer .widgetText){
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-items: center;
      place-items: center;
      place-content: center;
      font-size: small;
      color: var(--textColor) !important;
   }

   :global([draggable="true"]) {
      /*
      To prevent user selecting inside the drag source
      */
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
   }


</style>