/**
 * Theme: Dark Theme
 * Version: 1.0.0
 * Creation Date: 2023-03-08
 */

/**
 * Set colors of Theme
 *
 * You can rename variables however you want. Or even do not use them. Write your colors directly in json.
 *
 * But do NOT change "keys" inside "themeColors" json.
 * 
 * Also add a themeName.css file to /static/themes folder, even if its blank.
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
        "tabsDivider": "#323232",
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
                "color": activeForeground,
                "backgroundColor": activeBackground,
            },
            "passive": {
                "color": foreground,
                "backgroundColor": background,
            },
        },
        "card": {},
        "select": {
            "color": inputForeground,
            "backgroundColor": background,
            "buttonBackgroundColor": inputBackground,
            "hoverColor": activeForeground,
            "hoverBackgroundColor": activeBackground,
        },
    },
    "switch": {
        "active": {
            "color": activeForeground,
            "backgroundColor": activeBackground,
        },
        "passive": {
            "color": inputForeground,
            "backgroundColor": inputBackground,
        },
    },
    "input": {
        "textarea": {
            "color": inputForeground,
            "backgroundColor": inputBackground,
        },
        "checkbox": {
            "checked": {
                "color": activeForeground,
                "backgroundColor": activeBackground,
            },
            "unchecked": {
                "color": inputForeground,
                "backgroundColor": inputBackground,
            },
        },
        "text": {
            "color": inputForeground,
            "backgroundColor": inputBackground,
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