
<script>
    import { onMount } from 'svelte';
    import jQuery from "jquery";
    import { globalVisibilityStore } from "../../../globals/globalstores.js";


    /*
        THIS PAGE IS SUBJECT TO CHANGE. SO NO JSDOC IS ATTACHED.
    */



    let globalVisibility = $globalVisibilityStore;
    $: globalVisibilityStore.set(globalVisibility);


    function toggleWidgetPanel(){
        globalVisibility.customizePanel = !globalVisibility.customizePanel;
    }


    onMount(() => {

        function handle_mousedown(e){
            var target = e.target.parentNode;

            if(jQuery(target).hasClass("floatingDialog") === true){

                var oldData = {};

                oldData.pageX0 = e.pageX;
                oldData.pageY0 = e.pageY;
                oldData.elem = target;
                oldData.offset0left = jQuery(target).offset()?.left ?? 0;
                oldData.offset0top = jQuery(target).offset()?.top ?? 0;

                function handle_dragging(e){
                    var left = oldData.offset0left + (e.pageX - oldData.pageX0);
                    var top = oldData.offset0top + (e.pageY - oldData.pageY0);
                    jQuery(oldData.elem)
                    .offset({top: top, left: left});
                }

                function handle_mouseup(e){
                    jQuery(target)
                    .off('mousemove', handle_dragging)
                    .off('mouseup', handle_mouseup);
                }

                jQuery(target)
                .on('mouseup', handle_mouseup)
                .on('mousemove', handle_dragging);

            }
        }

        jQuery('.dialogTitle').on('mousedown', handle_mousedown);

    });




</script>


<div class="floatingDialog">

    <div class="dialogTitle">
        <div class="d-inline">
            <button class="btn btn-sm" on:click={toggleWidgetPanel}><i class="fa fa-xmark closeIcon"></i></button>
            <slot name="title"></slot>
        </div>
    </div>

    <slot class="dialogBody">
        <span class="emptyBody d-flex align-items-center justify-content-center">Empty for now!</span>
    </slot>

</div>


<style>

.floatingDialog {
    position:fixed;
    z-index: 999;
    width: 350px;
    height: 60vh;
    background-color: #262733;

    border-radius: 16px;
    border: 2px solid #d8d8d8; 
    box-shadow: 0px 0px 8px 0px #404258;

    margin: auto;

}

.dialogTitle {
    position: relative;
    background-color: #474E68;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    color: #d8d8d8;
    box-shadow: 0px 1px 1px 0px #313131;
}

.dialogBody{
    position: relative;
    color: #6B728E;
    padding: 14px;
}

.emptyBody{
    color: #6B728E;
    width: 100%;
    height: 100%;
}

.closeIcon{
    color: #6B728E;
    font-size: large;
}

</style>