module.exports = {
    app: {
        files: [
            {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html'],
                dest: 'public/app/'
            }
        ]
    }
};