var fs = require('fs'),
    path = require('path'),
    utils = require('./utils.js'),
    modal = module.exports = {};

// Load the template
var confirmTemplate = fs.readFileSync(path.join(__dirname, './../html/modal-confirm.html'), 'utf8');
var confirm2Template = fs.readFileSync(path.join(__dirname, './../html/modal-confirm-2.html'), 'utf8');

/**
 * confirm(opts, [callback])
 * 
 * Open a modal confirmation dialog.
 * 
 * @param {object} opts An options object. (See below)
 * @param {any} callback The callback function that will be invoked when the dialog closes. The callback recieves 
 * the result from the confirmation dialog. Either true or false.
 * 
 * Options:
 * - title {string} A custom title for the dialog. Defaults to 'Confirm'.
 * - message {string} A custom message for the dialog. Defualts to 'Are you sure?'.
 * - no {string} A custom text for the no button.
 * - yes {string} A custom text for the yes button.
 * 
 * Note: Options are also passed to the bootstrap modal object.
 * Note: Dismissing the dialog is considered a no.
 */
modal.confirm = function (opts, callback) {
    utils.trace('modal.confirm', arguments);

    callback = utils.ensureCallback(callback);
    opts = Object.assign({
        title: 'Confirm',
        message: 'Are you sure?',
        no: 'No',
        yes: 'Yes'
    }, opts);

    var handled = false,
        instance,
        template = global.$(confirmTemplate);

    // Customize template
    template.find('.confirm-title').html(opts.title);
    template.find('.confirm-body').html(opts.message);
    template.find('.confirm-no').text(opts.no);
    template.find('.confirm-yes').text(opts.yes).click(function () {
        handled = true;
        instance.modal('hide');
        callback(true);
    });

    // Add the template as the top element on the body.
    global.$('body').prepend(template);

    // Grab the modal instance and open it.
    instance = global.$('.modal')
    instance.on('hidden.bs.modal', function () {
        if (!handled) {
            handled = true;
            template.remove();
            callback(false);
        } else {
            template.remove();
        }
    });
    instance.modal(opts);
};

/**
 * confirm2(opts, [callback])
 * 
 * Open a modal confirmation dialog with an additional 'cancel' option.
 * 
 * @param {object} opts An options object. (See below)
 * @param {any} callback The callback function that will be invoked if either yes or no is selected. The callback recieves 
 * the result from the confirmation dialog. Either true or false.
 * 
 * Options:
 * - title {string} A custom title for the dialog. Defaults to 'Confirm'.
 * - message {string} A custom message for the dialog. Defualts to 'Are you sure?'.
 * - cancel {string} A custom text for the cancel button.
 * - no {string} A custom text for the no button.
 * - yes {string} A custom text for the yes button.
 * 
 * Note: Options are also passed to the bootstrap modal object.
 * Note: Dismissing the dialog is considered as a cancel.
 */
modal.confirm2 = function (opts, callback) {
    utils.trace('modal.confirm2', arguments);

    callback = utils.ensureCallback(callback);

    opts = Object.assign({
        title: 'Confirm',
        message: 'Are you sure?',
        cancel: 'Cancel',
        no: 'No',
        yes: 'Yes'
    }, opts);

    var instance,
        template = global.$(confirm2Template);

    // Customize template
    template.find('.confirm-title').html(opts.title);
    template.find('.confirm-body').html(opts.message);
    template.find('.confirm-cancel').text(opts.cancel);
    template.find('.confirm-no').text(opts.no).click(function () {
        instance.modal('hide');
        callback(false);
    });;
    template.find('.confirm-yes').text(opts.yes).click(function () {
        instance.modal('hide');
        callback(true);
    });

    global.$('body').prepend(template);

    instance = global.$('.modal')
    instance.on('hidden.bs.modal', function () {
        template.remove();
    });
    instance.modal(opts);
};
