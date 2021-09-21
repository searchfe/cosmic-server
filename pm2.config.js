module.exports = {
    apps: [{
        name: 'd2r',
        script: 'npm',
        args: 'run start',
        watch: './src',
        instances: 1,
        exec_mode: 'fork'
    }]
};
