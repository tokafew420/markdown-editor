var fs = require('fs'),
    EventEmitter = require('events'),
    marked = require("marked"),
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

editor.updatePreview = function () {
    var resultDiv = global.$('.md_result');
    var textEditor = global.$('#editor');
    var text = textEditor.val();
    resultDiv.html(marked(text));
};

editor.update = function () {
    this.updatePreview();
    editor.emit('dirty');
};

editor.loadText = function (text) {
    var textEditor = global.$('#editor');
    textEditor.val(text);
    this.updatePreview();
};

editor.loadFile = function (filepath) {
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        editor.loadText(data);
        editor.filepath = filepath;
        editor.emit('file-loaded');
    });
};

editor.chooseFile = function (name, callback) {
    var chooser = global.$(name);
    chooser.change(function (evt) {
        callback(global.$(this).val());
    });

    chooser.trigger('click');
};

editor.save = function (filepath, callback) {
    var textEditor = global.$('#editor');
    
    fs.writeFile(filepath, textEditor.val(), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
        callback(err);
    });
};
