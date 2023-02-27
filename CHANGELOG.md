# Change Log
All notable changes to this project will be documented in this file.

All notes are for developers, since this repository will not be public.




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