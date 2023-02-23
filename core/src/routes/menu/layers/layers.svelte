<script>
    import Layerstree from "./layerstree.svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore } from "../../globals/globalstores.js";

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

<div class="layerPanel " style='
--fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor};
--fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
--fixedPanelButtonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
--fixedPanelButtonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
--fixedPanelButtonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
--fixedPanelButtonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >
<h3>Layers</h3>
<br/>

{#each $globalComponentCollectionStore as component}
    <Layerstree {component} let:component>
      <span class="align-middle"></span>{component.type} <span class="text-[8px] align-middle">{component.uuid}</span> 
        <!-- {component.type} - {component.uuid} -->
        <!-- {#if component.type == "body"}
        BODY
        {:else if component.type == "body"}
        {/if} -->
    </Layerstree>
{/each}

</div>


<style>
   
    .layerPanel{
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