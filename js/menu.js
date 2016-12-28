var fs = require('fs'),
    editor = require("./../js/editor.js");

module.exports.initMenu = function () {
    // Create app menubar
    var win = global.gui.Window.get();
    var menubar = new global.gui.Menu({
        type: 'menubar'
    });

    var fileMenu = new global.gui.Menu();
    menubar.append(new global.gui.MenuItem({
        label: 'File',
        submenu: fileMenu
    }));
    // Append menubar to window
    win.menu = menubar;

    fileMenu.append(new global.gui.MenuItem({
        label: 'New',
        click: function () {
            editor.loadText("");
            editor.filepath = '';
            fileSave.enabled = true;
        }
    }));
    
    fileMenu.append(new global.gui.MenuItem({
        label: 'Open',
        click: function () {
            editor.chooseFile("#openFileDialog", function (filename) {
                editor.loadFile(filename);
                editor.filepath = filename;
            });
        }
    }));

    var fileSave = new global.gui.MenuItem({
        label: 'Save',
        click: function () {
            if (editor.filepath) {
                editor.save(editor.filepath, function (err) {
                    if (!err) fileSave.enabled = false;
                });
            } else {
                editor.chooseFile("#saveFileDialog", function (filename) {
                    editor.save(filename, function (err) {
                        if (!err) {
                            fileSave.enabled = false;
                            editor.filepath = filename;
                        }
                    })
                });
            }
        }
    });
    fileMenu.append(fileSave);
    editor.on('dirty', function () {
        fileSave.enabled = true;
    });
    editor.on('file-loaded', function () {
        fileSave.enabled = false;
    });

    fileMenu.append(new global.gui.MenuItem({
        label: 'Save As',
        click: function () {
            editor.chooseFile("#saveFileDialog", function (filename) {
                editor.save(filename, function (err) {
                    if (!err) {
                        fileSave.enabled = false;
                        editor.filepath = filename;
                    }
                })
            });
        }
    }));

    fileMenu.append(new global.gui.MenuItem({
        label: 'Exit',
        click: function () {
            global.gui.App.quit();
        }
    }));
};
