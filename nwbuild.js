var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: [
        './package.json',
        './css/**/**',
        './html/**/**',
        './img/**/**',
        './js/**/**',
        './node_modules/marked/**/**',
        './node_modules/jquery/dist/**/**',
        './node_modules/taboverride/build/output/**/**'
    ],
    platforms: ['win64'],
    winIco: './img/icon.png'
});

nw.on('log', console.log);

nw.build().then(function () {
    console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
