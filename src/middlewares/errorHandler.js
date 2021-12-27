module.exports = (error, req, res, next) => {
    const status = error.code || error.statusCode || 500
    const toSend = { code: status, msg: error.msg || 'Internal server error' }
    //console.log(toSend)
    res.status(status)
    res.send(toSend)
};