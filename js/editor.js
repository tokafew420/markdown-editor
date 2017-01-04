/**
 * editor
 * 
 * Provide the markdown editor and preview implementation.
 */

var fs = require('fs'),
    EventEmitter = require('events'),
    marked = require("marked"),
    utils = require('./utils.js'),
    fileDialog = require('./file-dialog.js'),
    editor = module.exports = new EventEmitter();

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

/**
 * _updatePreview()
 * 
 * Takes the markdown from the editor and transforms it into html then updates the preview.
 */
function _updatePreview() {
    var preview = global.$('#preview');
    var textEditor = global.$('#editor');
    var text = textEditor.val();
    preview.html(marked(text));
};

/**
 * _loadText(text)
 * 
 * Replace the text within the editor.
 * 
 * @param {string} text The text to put inside the editor.
 */
function _loadText(text) {
    var textEditor = global.$('#editor');
    textEditor.val(text);
};

/**
 * update([callback])
 * 
 * Updates the preview panel.
 * 
 * @param {function} callback The callback when the update is done.
 */
editor.update = function (callback) {
    //utils.trace('editor.update', arguments);
    callback = utils.ensureCallback(callback);

    _updatePreview();
    editor.dirty = true;
    editor.emit('dirty');
    callback();
};

/**
 * loadFile([filepath], [callback])
 * 
 * Loads a the file contents into the editor.
 * 
 * @param {string} filepath The file path. If not specified then it will be prompted for.
 * @param {function} callback The callback(err, filepath) when the file has been loaded. 
 */
editor.loadFile = function (filepath, callback) {
    utils.trace('editor.loadFile', arguments);

    callback = utils.ensureCallback(callback);

    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            editor.emit('file-load', err);
            return callback(err);
        }

        _loadText(data);
        _updatePreview();
        editor.filepath = filepath;
        editor.dirty = false;
        editor.emit('file-load', null, filepath);

        callback(null, filepath);
    });
};

/**
 * loadNew([callback])
 * 
 * Loads a blank document into the editor.
 * 
 * @param {function} callback The callback when the editor is updated.
 */
editor.loadNew = function (callback) {
    utils.trace('editor.loadNew', arguments);

    callback = utils.ensureCallback(callback);

    _loadText('');
    _updatePreview();
    editor.filepath = '';
    editor.dirty = false;
    editor.emit('new');

    callback();
};

/**
 * save([filepath], [callback])
 * 
 * Saves the file to the specified path.
 * 
 * @param {string} filepath The target file path. If no path is provided then it will be prompted for.
 * @param {any} callback The callback invoked after the file is saved. The callback will recieve the save err if any.
 */
editor.save = function (filepath, callback) {
    utils.trace('editor.save', arguments);

    callback = utils.ensureCallback(callback);

    if (filepath) {
        var textEditor = global.$('#editor');

        fs.writeFile(filepath, textEditor.val(), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("File saved to: [%s]", filepath);
                editor.dirty = false;
                editor.filepath = filepath;
            }
            callback(err);
        });
    } else {
        fileDialog.saveAs("#fileDialog", function (filename) {
            editor.save(filename, callback);
        });
    }
};
