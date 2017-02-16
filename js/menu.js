/**
 * menu
 * 
 * Contains menu initialization and functionality.
 */
var editor = require("./editor.js"),
    fileDialog = require('./file-dialog.js'),
    modal = require('./modal.js');


/**
 * promptToSave([callback])
 * 
 * Prompts the user to save prior to performing the callback function.
 * 
 * @param {function} callback The callback after the possible save.
 */
function promptToSave(callback) {
    if (editor.dirty) {
        modal.confirm2({
            title: 'Unsaved Changes',
            message: 'You have unsaved changes. Do you want to save?',
            no: "Don't Save",
            yes: 'Save'
        }, function (save) {
            // If the save is not needed then just callback, else pass the callback to the save function.
            if (save == false) {
                callback();
            } else if (save) {
                editor.save(editor.filepath, callback);
            }
        });
    } else {
        callback();
    }
}


/**
 * initMenu()
 * 
 * Initializes the app menu bar.
 */
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

    fileMenu.append(new global.gui.MenuItem({
        label: 'New',
        click: promptToSave.bind(null, function () {
            editor.loadNew(function () {
                fileSave.enabled = true;
                fileDialog.clear("#fileDialog");
            });
        }),
        key: 'n',
        modifiers: 'ctrl'
    }));

    fileMenu.append(new global.gui.MenuItem({
        label: 'Open',
        click: promptToSave.bind(null, function () {
            fileDialog.open("#fileDialog", function (filename) {
                editor.loadFile(filename);
            });
        }),
        key: 'o',
        modifiers: 'ctrl'
    }));

    var fileSave = new global.gui.MenuItem({
        label: 'Save',
        click: function () {
            editor.save(editor.filepath, function (err) {
                if (!err) fileSave.enabled = false;
            });
        },
        key: 's',
        modifiers: 'ctrl'
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
            editor.save('', function (err) {
                if (!err) {
                    fileSave.enabled = false;
                }
            });
        }
    }));

    fileMenu.append(new global.gui.MenuItem({
        label: 'Exit',
        click: promptToSave.bind(null, function () {
            global.gui.App.quit();
        })
    }));
    win.on('close', function () {
        var self = this;
        promptToSave(function () {
            self.close(true);
        });
    });

    // Append menubar to window
    // This has to be done after all menubar items have been appended
    win.menu = menubar;
};
