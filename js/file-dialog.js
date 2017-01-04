/**
 * file-dialog
 * 
 * Exposes API to work with browser file dialogs.
 */
var utils = require('./utils.js');

var fileDialog = module.exports = {};

/**
 * saveAs(selector, [callback])
 * 
 * Opens a Save As dialog that allows the user to enter the name of the file to save.
 * 
 * @param {string} selector The jquery selector for the file input element.
 * @param {function} callback The callback when a file is selected.
 * 
 * Note: The callback is only executed when the input value has changed.
 */
fileDialog.saveAs = function (selector, callback) {
    utils.trace('fileDialog.saveAs', arguments);

    callback = utils.ensureCallback(callback);

    var input = global.$(selector);
    input.attr('nwsaveas', '');
    input.off('change').on('change', function (evt) {
        callback(global.$(this).val());
    });

    input.trigger('click');
};

/**
 * open(selector, [callback])
 * 
 * Opens a file dialog to select a file.
 * 
 * @param {string} selector The jquery selector for the file input element.
 * @param {function} callback The callback when a file is selected.
 * 
 * Note: The callback is only executed when the input value has changed.
 */
fileDialog.open = function (selector, callback) {
    utils.trace('fileDialog.open', arguments);

    callback = utils.ensureCallback(callback);

    var input = global.$(selector);
    input.removeAttr('nwsaveas');
    input.off('change').on('change', function (evt) {
        callback(global.$(this).val());
    });

    input.trigger('click');
};

/**
 * clear(selector, [callback])
 * 
 * Clears the current value from the file input element.
 * 
 * @param {string} selector The jquery selector for the file input element.
 */
fileDialog.clear = function (selector) {
    utils.trace('fileDialog.clear', arguments);

    var input = global.$(selector);
    input.val('');
};
