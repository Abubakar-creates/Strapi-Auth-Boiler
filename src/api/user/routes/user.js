module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/register',
            handler: 'user.register',
            config: {
                policies: ['global::is-authenticated'],
                middlewares: []
            }
        },
        {
            method: 'POST',
            path: '/login',
            handler: 'user.login',
            config: {
                policies: ['global::is-authenticated'],
                middlewares: []
            }
        },
        {
            method: 'GET',
            path: '/me',
            handler: 'user.getUserDetail',
            config: {
                policies: ['global::is-authenticated'],
                middlewares: ['is-authenticated']

            }
        }

    ]
}