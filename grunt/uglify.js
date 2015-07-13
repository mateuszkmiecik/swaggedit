module.exports = {
    combine: {
        files: {
            'public/app/app.js': [
                'app-annotated/application.annotated.js',
                'app-annotated/**/*.annotated.js'
            ]
        }
    }
};