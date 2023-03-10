<script context="module">


    import swal from 'sweetalert';
    import { writable } from 'svelte/store';
    let overlayBackground = writable("#242425");
    let modalBackground = writable("#242425");
    let modalBorder = writable("1px solid #242425");
    let modalCustomCss = writable("");
    let titleColor = writable("");
    let titleBackgroundColor = writable("");
    let titleCustomCss = writable("");
    let textColor = writable("");
    let textBackgroundColor = writable("");
    let textCustomCss = writable("");
    let buttonCancelColor = writable("");
    let buttonCancelBackgroundColor = writable("");
    let buttonConfirmColor = writable("");
    let buttonConfirmBackgroundColor = writable("");
    let buttonDangerColor = writable("");
    let buttonDangerBackgroundColor = writable("");

    /**
     * Required data to show alert
     * @typedef {Object} AlertData
     * @property {string} title
     * @property {string} [text]
     * @property {string} [icon] - One of "success", "info", "warning", "error"
     * @property {boolean} [dangerMode] - Changes default button to secondary. Use at critical places like delete functions
     * @property {Array<string>} [buttons] - ["No", "Yes"]
     * @property {function} [action] - Function to apply according to result of alert, use "value" as result parameter in your function
     */

    /**
     * Alerts "Sweet Alert" module with custom Atom style
     * @param {JSON} globalThemeStore "globalThemeStore" from globalstores.js
     * @param {AlertData} alertData 
     */
    export function atomAlert(globalThemeStore, alertData){
        if(globalThemeStore === undefined){
            throw "atomAlert: globalThemeStore is undefined.";
        }   

        overlayBackground.set(globalThemeStore.swal.overlay.backgroundColor != undefined ? globalThemeStore.swal.overlay.backgroundColor : "#242425");
        modalBackground.set(globalThemeStore.swal.modal.backgroundColor != undefined ? globalThemeStore.swal.modal.backgroundColor : "#242425");
        modalBorder.set(globalThemeStore.swal.modal.border != undefined ? globalThemeStore.swal.modal.border : "1px solid #242425");
        modalCustomCss.set(globalThemeStore.swal.modal.customCss != undefined ? globalThemeStore.swal.modal.customCss : "");

        titleColor.set(globalThemeStore.swal.title.color != undefined ? globalThemeStore.swal.title.color : "");
        titleBackgroundColor.set(globalThemeStore.swal.title.backgroundColor != undefined ? globalThemeStore.swal.title.backgroundColor : "");
        titleCustomCss.set(globalThemeStore.swal.title.customCss != undefined ? globalThemeStore.swal.title.customCss : "");

        textColor.set(globalThemeStore.swal.text.color != undefined ? globalThemeStore.swal.text.color : "");
        textBackgroundColor.set(globalThemeStore.swal.text.backgroundColor != undefined ? globalThemeStore.swal.text.backgroundColor : "");
        textCustomCss.set(globalThemeStore.swal.text.customCss != undefined ? globalThemeStore.swal.text.customCss : "");

        buttonCancelColor.set(globalThemeStore.swal.buttonCancel.color != undefined ? globalThemeStore.swal.buttonCancel.color : "");
        buttonCancelBackgroundColor.set(globalThemeStore.swal.buttonCancel.backgroundColor != undefined ? globalThemeStore.swal.buttonCancel.backgroundColor : "");

        buttonConfirmColor.set(globalThemeStore.swal.buttonConfirm.color != undefined ? globalThemeStore.swal.buttonConfirm.color : "");
        buttonConfirmBackgroundColor.set(globalThemeStore.swal.buttonConfirm.backgroundColor != undefined ? globalThemeStore.swal.buttonConfirm.backgroundColor : "");

        buttonDangerColor.set(globalThemeStore.swal.buttonDanger.color != undefined ? globalThemeStore.swal.buttonDanger.color : "");
        buttonDangerBackgroundColor.set(globalThemeStore.swal.buttonDanger.backgroundColor != undefined ? globalThemeStore.swal.buttonDanger.backgroundColor : "");


   

        var data = {};
        if(alertData.title      !== undefined) data["title"]        = alertData.title;
        if(alertData.text       !== undefined) data["text"]         = alertData.text;
        if(alertData.icon       !== undefined) data["icon"]         = alertData.icon;
        if(alertData.dangerMode !== undefined) data["dangerMode"]   = alertData.dangerMode;
        if(alertData.buttons    !== undefined) data["buttons"]      = alertData.buttons;

        data['className'] = "swal-test";

        swal(data).then(value => {
            if(alertData.action !== undefined){
                alertData.action(value);
            }
        });        

        // console.log('--swalOverlayBackgroundColor:'+overlayBackground+';');
        // console.log('--swalModalBackgroundColor:'+modalBackground+';');
        // console.log('--swalModalBorder:'+modalBorder+';');
        // console.log('--swalModalCustomCss:'+modalCustomCss+';');
        // console.log('--swalModalCustomCss:'+modalCustomCss+';');

    }

</script>

<div class="hidden swal-overlay swal-modal swal-test" style='
    --swalOverlayBackgroundColor:{$overlayBackground};
    --swalModalBackgroundColor:{$modalBackground};
    --swalModalBorder:{$modalBorder};
    --swalModalCustomCss:{$modalCustomCss};

    --titleColor:{$titleColor};
    --titleBackgroundColor:{$titleBackgroundColor};
    --titleCustomCss:{$titleCustomCss};

    --textColor:{$textColor};
    --textBackgroundColor:{$textBackgroundColor};
    --textCustomCss:{$textCustomCss};

    --buttonCancelColor:{$buttonCancelColor};
    --buttonCancelBackgroundColor:{$buttonCancelBackgroundColor};

    --buttonConfirmColor:{$buttonConfirmColor};
    --buttonConfirmBackgroundColor:{$buttonConfirmBackgroundColor};

    --buttonDangerColor:{$buttonDangerColor};
    --buttonDangerBackgroundColor:{$buttonDangerBackgroundColor};

'></div>


<style>

/*   
    :global(.swal-modal) {
        background-color: var(--swalModalBackgroundColor, #242425) !important;
        border: var(--swalModalBorder, 1px solid #FFFFFF0A) !important;
    }

    :global(.swal-title) {
        background-color: var(--titleBackgroundColor, #242425) !important;
        color: var(--titleColor, #ffffff) !important;
    }

    :global(.swal-text) {
        background-color: var(--textBackgroundColor, #242425) !important;
        color: var(--textColor, #9F9F9F) !important;
    }

    :global(.swal-button) {
        padding: 7px 19px;
        border-radius: 8px;
        background-color: #70bce080; 
        font-size: 12px;
        text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
    }

    :global(.swal-button--cancel) {
        background-color: var(--buttonCancelBackgroundColor, #373737) !important;
        color: var(--buttonCancelColor, #BDBDBD) !important;
    }

    :global(.swal-button--confirm) {
        background-color: var(--buttonConfirmBackgroundColor, #70bce080) !important; 
        color: var(--buttonConfirmColor, #fff) !important;
    }

    :global(.swal-button--danger) {
        background-color: var(--buttonDangerBackgroundColor, #e64942) !important;
        color: var(--buttonDangerColor, #fff) !important;
    }

    :global(.swal-button--success) {
        background-color: var(--buttonConfirmBackgroundColor, #a5dc86) !important; 
        color: var(--buttonConfirmColor, #fff) !important;
    } */

  
</style>


{#if $modalCustomCss != ""}
  <style>
    .swal-modal {
      {@html `/* Custom styles from the customCss variable */
        ${".swal-modal { " + $modalCustomCss + " }"}
      `}
    }
  </style>
{/if}