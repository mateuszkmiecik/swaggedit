module.exports = {
    app: {
        files: [
            'app/**/*.js'
        ],
        tasks: ['graceful:ngAnnotate', 'graceful:uglify'],
        options: {
            spawn: false
        }
    },
    html: {
        files: [
            'app/**/*.html'
        ],
        tasks: ['copy'],
        options: {
            spawn: false
        }
    },
    less: {
        files: [
            'less/**/*.less'
        ],
        tasks: ['less'],
        options: {
            spawn: false
        }
    }
};