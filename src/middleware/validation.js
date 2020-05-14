function validate (schema) {
    return async function (req, res, next) {
        try {
            const result = await schema.validateAsync(req.body);
            next();
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = validate;