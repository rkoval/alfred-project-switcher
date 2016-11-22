# MacVim Project Switcher

Tested on macOS 10.11.6 (El Capitan), but it likely works on other versions of macOS as well.

## Installation
1. [Install node 6.9.1](https://nodejs.org/en/download/)
1. Install project dependencies via `yarn`:
  ```sh
  yarn install
  ```

  ... or via vanilla `npm` if you don't have `yarn` installed:
  ```sh
  npm install
  ```

1. Create a _projects.json_ file modeled after [this sample file](sample-projects.json) that will contain all of your projects to manage.
1. Import the blank Workflow into Alfred
1. Run the project generator:

  ```sh
  ./run.sh
  ```
1. [Add an Accessibility Access policy for Alfred](http://mizage.com/help/accessibility.html)
  - The AppleScript used for focusing an already open project requires this privilege
