# Alfred Project Switcher

This is a simple Alfred Workflow to open up projects in (currently) MacVim or focus them if they're already open.

Tested on macOS 10.13.6, but it likely works on other versions of macOS as well.

## Installation

1. Download the [empty project file](empty-alfred-project-switcher.alfredworkflow) and open it in Alfred
1. Right click on the workflow in the Workflow browser and click `Open in Terminal`
    - You'll want to save the destination of this directory because you'll be back to it whenever you want to add new projects
1. [Install node v10.8.0](https://nodejs.org/en/download/) (many older versions will probably work) and [yarn](https://yarnpkg.com/en/)
1. Install project dependencies via `yarn`:
    ```sh
    yarn install
    ```
1. Create a `projects.yml` file modeled after [this sample file](projects.sample.yml) that will contain all of your projects to manage.
1. [Add an Accessibility Access policy for Alfred](http://mizage.com/help/accessibility.html)
    - The AppleScript used for focusing an already open project requires this privilege

## Generating Projects for the Workflow
_You'll do this every time you have a project to add or remove_

1. Modify the `projects.yml` file
1. Run the project generator:
    ```sh
    ./generate_items.js
    ```
1. Open Alfred and type `e ${your-project}` to trigger the workflow
