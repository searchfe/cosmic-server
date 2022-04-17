module.exports = {
    apps: [{
        name: 'd2r',
        script: 'npm',
        args: 'run start:dev',
        watch: './src',
        instances: 1,
        exec_mode: 'fork'
    }]
};
