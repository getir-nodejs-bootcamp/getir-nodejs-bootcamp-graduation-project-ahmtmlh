const Records = require('../model/Record')
const hs = require('http-status')

const getISODate = (date) => {
    return new Date(new Date(date).toISOString())
}

class RecordsService{
    query(source) {
        const p = new Promise((resolve, reject) => {
            Records.find({
                createdAt: {
                    $gte: getISODate(source.startDate),
                    $lte: getISODate(source.endDate)
                }
            }).then(records => {
                let arr = []
                for (let record of records) {
                    let totalCount = record.counts.reduce((v1, v2) => { return v1 + v2 }, 0)
                    if (totalCount >= source.minCount && totalCount <= source.maxCount) {
                        record.totalCount = totalCount
                        arr.push(record)
                    }
                }

                if (arr.length > 0) {
                    resolve(arr)
                } else {
                    reject({code: hs.NOT_FOUND, msg: 'No records found'})
                }

            }).catch(err => reject({ code: hs.INTERNAL_SERVER_ERROR , msg: 'Internal server error'}))
        })
        
        return p
   }
}

module.exports = RecordsService
