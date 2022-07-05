module.exports = {
    apps: [{
            name: 'soc_api',
            script: 'App.js',
            watch: '.',
            exec_mode: "fork",
            "interpreter": "./node_modules/.bin/nodemon",
            "env": {
                ACCESS_TOKEN_SECRET: "theAccessTokenSecret",
                REFRESH_TOKEN_SECRET: "theAccessTokenSecret",
                PORT: 3555
            }
        },
        {
            name: 'soc_front',
            watch: './client/',
            script: 'cd ./client/ && yarn start',
            exec_mode: "fork",
            env: {
                DANGEROUSLY_DISABLE_HOST_CHECK: true,
                PORT: 3666,
            }
        }
    ],
};