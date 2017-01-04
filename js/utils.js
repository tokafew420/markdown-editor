/**
 * utils
 * 
 * Exposes utility functions.
 */
var util = require('util'),
    utils = module.exports = Object.create(util);

/**
 * noop()
 * 
 * A no-op function.
 */
utils.noop = function noop() {};


/**
 * ensureCallback([callback])
 * 
 * Makes sure that the callback is a function.
 * 
 * @param {function} callback The callback function.
 * @returns The callback function or noop if the callback argument is not a function.
 */
utils.ensureCallback = function (callback) {
    return typeof callback === 'function' ? callback : utils.noop;
};

/**
 * trace(fn, args)
 * 
 * Trace the function calls for debugging purposes.
 * 
 * @param {function|string} fn The function to log or the name of the function.
 * @param {object} args The arguments object of the function call.
 */
utils.trace = function (fn, args) {
    args = Array.prototype.slice.call(args);

    var param = util.inspect(args);
    param = param.substring(1, param.length - 1);

    console.debug('%s(%s)', typeof fn === 'string' ? fn : fn.name || 'anonymous', param);
};
