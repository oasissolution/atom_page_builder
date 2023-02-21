# Change Log
All notable changes to this project will be documented in this file.

All notes are for developers, since this repository will not be public.


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