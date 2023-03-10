/**
 * Theme: Dark Theme
 * Version: 1.0.0
 * Creation Date: 2023-03-08
 * Created By: Fatih KUROĞLU
 */

/**
 * Set colors of Theme
 *
 * You can rename variables however you want. Or even do not use them. Write your colors directly in json.
 *
 * But do NOT change "keys" inside "themeColors" json
 */


const background = "#242425";
const foreground = "#9F9F9F";

const activeBackground = "#0092ED26"; //0092ED26
const activeForeground = "#0092ED";

const buttonBackground = "#FFFFFF0A";

const inputBackground = "#373737";
const inputForeground = "#BDBDBD";


export const themeColors = {
    "mainLayout": {
        "backgroundFrameColor": foreground,
        "editorBackgroundColor": "#ffffff",
        "backgroundColor": background,
        "foregroundColor": foreground,
    },
    "menu": {
        "backgroundColor": background,
        "foregroundColor": foreground,
    },
    "panel": {
        "backgroundColor": background,
        "foregroundColor": foreground,
        "titleColor": "#ffffff",
    },
    "widgetIcon": {
        "backgroundColor": "transparent",
        "foregroundColor": foreground,
        "borderColor": "transparent",
        "iconColor": foreground,
        "textColor": foreground,
    },
    "button": {
        "active": {
            "iconColor": activeForeground,
            "textColor": activeForeground,
            "backgroundColor": activeBackground,
        },
        "passive": {
            "iconColor": foreground,
            "textColor": foreground,
            "backgroundColor": buttonBackground,
        },
    },
    "options": {
        "button": {
            "active": {
                "iconColor": activeForeground,
                "textColor": activeForeground,
                "backgroundColor": activeBackground,
            },
            "passive": {
                "iconColor": foreground,
                "textColor": foreground,
                "backgroundColor": background,
            },
        },
        "card": {},
        "select": {},
    },
    "switch": {
        "active": {
            "iconColor": activeForeground,
            "textColor": activeForeground,
            "backgroundColor": activeBackground,
        },
        "passive": {
            "iconColor": foreground,
            "textColor": foreground,
            "backgroundColor": background,
        },
    },
    "input": {
        
    },
    "swal": {
        "overlay": {
            "backgroundColor": background,
        },
        "modal": {
            "backgroundColor": background,
            "border": "1px solid " + buttonBackground,
            "customCss": "",
        },
        "title": {
            "backgroundColor": background,
            "color": foreground,
            "customCss": "",
        },
        "text": {
            "backgroundColor": background,
            "color": foreground,
            "customCss": "",
        },
        "buttonConfirm": {
            "backgroundColor": background,
            "color": foreground,
        },
        "buttonCancel": {
            "backgroundColor": inputBackground,
            "color": inputForeground,
        },
        "buttonDanger": {
            "backgroundColor": background,
            "color": foreground,
        },

    },
}

/*
"backgroundFrameColor": "#474e6818",
        "backgroundColor": "#404258",
        "editorBackgroundColor": "#ffffff",
        "foregroundColor": "#aaaebe",
        "buttonActiveBackgroundColor": "#262733",
        "buttonPassiveBackgroundColor": "transparent",
        "buttonActiveForegroundColor": "#aaaebe",
        "buttonPassiveForegroundColor": "#aaaebe",
        "fixedPanelForegroundColor": "#aaaebe",
        "fixedPanelBackgroundColor": "#262733",
        "fixedPanelButtonActiveBackgroundColor": "#404258",
        "fixedPanelButtonPassiveBackgroundColor": "transparent",
        "fixedPanelButtonActiveForegroundColor": "#aaaebe",
        "fixedPanelButtonPassiveForegroundColor": "#aaaebe",
        "editorMouseOverColor":"#404258",
*/