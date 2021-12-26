const RecordsService = require('../services/records')
const hs = require('http-status')

class RecordController{

    query(req, res, next) {
        RecordsService.query(req.body)
            .then(recordList => res.status(hs.OK).send({ code: 0, msg: 'Success', records: recordList }))
            .catch(err => next({...err}))
    }
}


module.exports = new RecordController()
