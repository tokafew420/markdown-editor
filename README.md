# Node-Webkit Markdown Editor

A very simple Markdown editor created with Node Webkit. This code is part of a tutorial: <http://ducode.org/node-webkit-tutorial-creating-a-markdown-editor.html>. The code is released under the MIT license, so do what you want with the code.

The editor is more a stub than a complete Markdown editor. Use this as a base for your own Markdown editor.

## Installation

1. Obviously, download the code to your favourite location.
1. With the command line, go to the folder and run `npm install`. This will install the dependencies for the editor.
1. From <http://nwjs.io/>, download the right version of Node-Webkit and extract the contents to the folder.
1. Voila, you're done. You might want to read [something](https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps) about packaging and distributing Node-Webkit apps.

![The editor](/img/md-complete.jpg)

## Build

To build, just run: `npm run build`

## Change Log

All changes logged here are updates to the original source.

### v0.2.0

- Changed editor into an EventEmitter and added 'dirty' and 'file-loaded' events.
- Enable/disable file save on dirty state.
- Added 'Save As' menu option.
- Added 'filepath' property to editor to track currently opened file.

### v0.1.0

- Forked repo.
- Add build script.
- Add .editorconfig and .eslintrc.json
- Moved jquery and tabOverride to node_modules.
- Reformatted all files.
- Fixed tabOverride issue
  - Module isn't initialized correctly because getElementsByTagName() wasn't returning elements.
  - Look into getElementsByTagName issue.
