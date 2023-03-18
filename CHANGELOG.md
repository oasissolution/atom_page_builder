# Change Log
All notable changes to this project will be documented in this file.

All notes are for developers, since this repository will not be public.





## [0.0.1.028] - 2022-03-18

### Added
 - Text Options - Design - Layout : Position -> Placement (Top/Right/Bottom/Left)
 - New Atom Ui Element: SelectDistance

### Changed


### Fixed


## [0.0.1.027] - 2022-03-17

### Added
 - Text Options - Design - Layout : Display, Position

### Changed
 - Separated each row of text options in an individual file.
 - Those which can be used in multiple element options collected in a common folder.

### Fixed



## [0.0.1.026] - 2022-03-16

### Added
 - Text Options - Design - Layout : Display, Position

### Changed
 - Separated each row of text options in an individual file.
 - Those which can be used in multiple element options collected in a common folder.

### Fixed



## [0.0.1.025] - 2022-03-15

### Added
 

### Changed
 - Module specific default values.
 - Started text options design tab.

### Fixed




## [0.0.1.024] - 2022-03-14

### Added
 - Atom ui components: select,  (Used in UI not editor)
 - Text Options panel; Font Size, Alignment, Vertical Alignment, Html Tag properties
 

### Changed
 - Text Options content panel finished.

### Fixed




## [0.0.1.023] - 2022-03-13

### Added
 - Css of Themes ( /static/themes )
 - Atom ui components: switch, textarea, optionsbutton, textinput (Used in UI not editor)
 

### Changed
 - Updated vertical menu.
 - Alert theme finished for dark theme.

### Fixed




## [0.0.1.022] - 2022-03-11

### Added
 - Create elements before/inside/after elements by drag&drop from widgets panel.

### Changed
 - Replace/Reorder elements before/inside/after elements by drag&drop from editor panel.

### Fixed




## [0.0.1.021] - 2022-03-10

### Added
 - Alert added (Customization/Themeing will be done later).

### Changed
 - Working on element replace/reorder with drag&drop.

### Fixed




## [0.0.1.020] - 2022-03-09

### Added
 - Double click opens Options panel of element.
 - Now user can delete selected item.

### Changed
 - Working on element replace/reorder with drag&drop.

### Fixed



## [0.0.1.019] - 2022-03-08

### Added


### Changed
 - Updated main frame theme.

### Fixed



## [0.0.1.018] - 2022-03-08

### Added
 - UI Components for Atom (Button)
 - Themes (Dark)

### Changed
 - Started to apply designed UI and theme.

### Fixed
 - Div drag & drop is working now.


## [0.0.1.017] - 2022-03-07

### Added
 - Drag & Drop Text finished.
 - Drag & Drop Div (has issues).

### Changed
 - 

### Fixed



## [0.0.1.016] - 2022-03-06

### Added
 - 

### Changed
 - Option panels now updates Json and sends to editor frame.
 - Editor panel updates according to edits

### Fixed



## [0.0.1.015] - 2022-03-03

### Added
 - Option panel pages of div and text. (Blank for now)

### Changed
 - 

### Fixed
 - Glitch on "build" versions.



## [0.0.1.014] - 2022-03-02

### Added
 - Tailwind CSS is working on jit (just-in-time) mode now.
 - New files for div and text elements actions.

### Changed
 - Action buttons of elements are dynamically taken from its actions file.

### Fixed
 - UI updates on json update.

### New Bug
 - When Json updates it makes a glitch in editor area on "build" at localhost. On "dev" server, there is no glitch.
 > "It sounds like the issue you're experiencing is related to how Svelte reloads components when their dependencies change. By default, Svelte will reload the entire application when any code or data changes, which can be inefficient and cause visual glitches like the ones you're experiencing." - ChatGPT
 - Will try new approaches. 



## [0.0.1.013] - 2022-03-01

### Added
 - Update global component collection json function. (globals/globalfunctions.js)

### Changed
 - Working on selector. (JSON updates. "Actions" buttons are showing in required position. UI does not update on json update automatically, still working on it)

### Fixed


## [0.0.1.012] - 2022-02-28

### Added


### Changed
 - Working on selector.

### Fixed



## [0.0.1.011] - 2022-02-27

### Added
 - Selector shared module. (By means of "shared", these modules are used by all (modules)/modules in editor.)
 - Test build in public folder. Please read README.md there.

### Changed
 - Selection of div elements changed in workflow. Now they trigger selector shared module.

### Fixed



## [0.0.1.010] - 2022-02-24

### Added
 - Selected item is highlighted at layers panel.

### Changed
 - Started on select statements of div.

### Fixed


## [0.0.1.009] - 2022-02-24

### Added


### Changed
 - Removed temporary backup folder.
 - Revised vertical menu

### Fixed


## [0.0.1.008] - 2022-02-23

### Added


### Changed
 - Extended Body, Div, Text data definitions


### Fixed



## [0.0.1.007] - 2022-02-23

### Added
 - Layers Panel (Treeview of elements in Json - style will be added later)
 - Basic modules Body, Div, Text (extra props, options will be added later)
 - Setting to defaults for build type. (Needed for release version variable settings)

### Changed
 - Editor panel started to show elements in Json.
 - Build version works in "http://localhost/atompagebuilder/app/"
 - Build files must be in server "/var/www/html/atompagebuilder/app/" folder. Does NOT run on double click in local folder.

### Fixed
 - Build version now works properly as in dev version.



## [0.0.1.006] - 2022-02-22

### Added


### Changed
 - Added some versions of editor.
 - Build version of editor still needs work.

### Fixed
 - Editor panel now updates when mainFrame updates.


## [0.0.1.005] - 2022-02-21

### Added
 - Tailwind CSS to all pages
 - Editor is now in iframe and works with Tailwind

### Changed
 - Updated folder hierarchy and layouts.
 - Removed all static files to decrease build size. Using jquery, tailwind, bootstrap-icons as npm modules.
 - Made a temporary back up. 
 - Divided source to "Core" and "Modules". Because adapter-static does not build.
 - Core will be build itself. Modules will be compiled seperately.

### Fixed
 - Adapter-static build errors.


## [0.0.1.004] - 2022-02-18

### Added
 - Blank layouts for editor and modules.
 - App folder for root layout.
 - Set group-layouts.

### Changed
 - Updated folder hierarchy and layouts.
 - Editor panel is in an iframe now. Still needs to work on it (planned)

### Fixed


## [0.0.1.003] - 2022-02-17

### Added
 - Widgets panel. (Empty, no widgets developed yet.)
 - Widgets Options panel. (Empty, no widgets developed yet.)
 - Editor views. These will be used in development and debugging.

### Changed
 - Editor bootstrap integrations. Still working on it.

### Fixed


## [0.0.1.002] - 2022-02-16

### Added
 - Screen resolutions to global constants
 - Copy of bootstrap to editor itself with custom edits. Responsive mode will be supported natively in editor panel.

### Changed
 - Updated manually written resolution values to use global constants.

### Fixed



## [0.0.1.001] - 2022-02-16

### Added
 - loadvariables to root directory.
 - Editor bootstrap relations

### Changed
 - Updated all recent JsDocs

### Fixed
 - Glitch on Customize Editor when changing locations.