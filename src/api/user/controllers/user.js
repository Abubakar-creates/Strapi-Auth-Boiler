const { sanitizeEntity } = require('@strapi/utils');


module.exports  = {
    async register(ctx) {

        console.log('i got hit ');
        
        const { name, email, password } = ctx.request.body;

        if (!name || !email || !password) {
            return ctx.badRequest('missing.required.parameter');
        }

        const existingUser = await strapi.query('plugin::user-permissions.user').findOne({ email });
        if (existingUser) {
            return ctx.badRequest('email.already.exists');
        }

        const user = await strapi.query('plugin::user-permissions.user').create({
            name,
            email,
            password,
        });

        const token = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });


        return {
            user: sanitizeEntity(user , { model : strapi.query('plugin::user-permissions.user').model.user }),
            token,
        }
        
    },


async login(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
        return ctx.badRequest('missing.required.parameter');
    }

    const user = await strapi.query('plugin::user-permissions.user').findOne({ email });

    if (!user) {
        return ctx.badRequest('user.not.found');
    }

    const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

    if (!validPassword) {
        return ctx.badRequest('invalid.password');
    }

    const token = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    return {
        user: sanitizeEntity(user , { model : strapi.query('plugin::user-permissions.user').model.user }),
        token,
    }

},


async getUserDetail (ctx) {
    const user = ctx.state.user;
    return sanitizeEntity(user , { model : strapi.query('plugin::user-permissions.user').model.user });

}

}