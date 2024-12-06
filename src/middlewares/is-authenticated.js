module.exports = async (ctx, next) => {
    const token = ctx.request.header.authorization;

    if (!token) {
        return ctx.unauthorized('token is missing');
    }

    try {
        const decode = await strapi.plugins['users-permissions'].services.jwt.verify(token);
        ctx.state.user = await strapi.plugins['users-permissions'].services.user.fetch({ id: decode.id });
    } catch (error) {
        return ctx.unauthorized('invalid token');
    }

    return next();
}