/**
 * Theme: Light Theme
 * Version: 1.0.0
 * Creation Date: 2023-04-17
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


const background = "#F4F4F4";
const foreground = "#0F0F0F";

const activeBackground = "#0092ED26"; //0092ED26
const activeForeground = "#0092ED";

const buttonBackground = "#E9E9E9"; //"#2C2C2C"

const inputBackground = "#E9E9E9";
const inputForeground = "#1C1C1C";


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
        "titleColor": foreground,
        "tabsDivider": buttonBackground,
        "collapseHeaderColor": foreground,
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
        "selectColor": {
            "color": inputForeground,
            "backgroundColor": inputBackground,
        },
    },
    
}
