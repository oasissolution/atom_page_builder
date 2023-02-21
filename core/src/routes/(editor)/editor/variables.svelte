<script>
    import { globalEditorPreferencesStore, globalVisibilityStore, globalRightPanelContentStore, globalLeftPanelContentStore } from "../../globals/globalstores";

</script>



<div class="w-full">
    <h1 class="text-2xl">Hello this is variables page</h1>
    <button class="btn btn-info">Test Button</button>
</div>


<div class="flex columns-0 lg:columns-2">
    <div class="">
        <h4>Global Editor Preferences</h4>
        <pre>{JSON.stringify($globalEditorPreferencesStore, null, 2)}</pre>
    </div>
    <div class="">
        <h4>Global Visibility</h4>
        <pre>{JSON.stringify($globalVisibilityStore, null, 2)}</pre>
        <h4>Global Right Panel Content Store</h4>
        <pre>{JSON.stringify($globalRightPanelContentStore, null, 2)}</pre>
        <h4>Global Left Panel Content Store</h4>
        <pre>{JSON.stringify($globalLeftPanelContentStore, null, 2)}</pre>
    </div>
</div>
