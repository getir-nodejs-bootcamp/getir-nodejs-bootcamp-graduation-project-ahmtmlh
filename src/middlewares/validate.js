const hs = require("http-status");

const validate = (schema, source) => (req, res, next) => {
    
    const { value, error } = schema.validate(req[source]);

    if (error) {
        const errorMessage = error?.details?.map((detail) => detail?.message).join(', ');
        return res.status(hs.BAD_REQUEST).send({ code: hs.BAD_REQUEST, msg: errorMessage || 'Invalid data' });
    }

    Object.assign(req, value);
    return next();
};

module.exports = validate;