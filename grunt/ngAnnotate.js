module.exports = {
    angular: {
        files: [{
            expand: true,
            src: [
                'app/**/*.js'
            ],
            rename: function(dest, src){
                return src.replace(/\.js$/, '.annotated.js').replace('app/', 'app-annotated/');
            }
        }]
    }
};