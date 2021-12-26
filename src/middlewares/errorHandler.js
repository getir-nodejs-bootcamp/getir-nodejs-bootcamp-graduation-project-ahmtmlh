module.exports = (error, req, res, next) => {
    res.status(error.code || 500)
    res.send(err || {code: 500, msg: 'Internal server error'})
};