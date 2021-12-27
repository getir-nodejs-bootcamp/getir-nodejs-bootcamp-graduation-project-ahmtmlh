const Records = require('../model/Record')
const hs = require('http-status')
const lodash = require('lodash')

const getISODate = (date) => {
    return new Date(new Date(date).toISOString())
}

class RecordsService{
    query(source) {
        console.time('DB Read')
        const p = new Promise((resolve, reject) => {
            Records.find({
                createdAt: {
                    $gte: getISODate(source.startDate),
                    $lte: getISODate(source.endDate)
                }
            }).then(records => {
                console.timeEnd('DB Read')
                console.time('Count filtering')
                let arr = []
                for (let record of records) {
                    let totalCount = record.counts.reduce((v1, v2) => { return v1 + v2 }, 0)
                    if (lodash.inRange(totalCount, source.minCount, source.maxCount)) {
                        let temp = {
                            'key': record.key,
                            'createdAt': record.createdAt,
                            'totalCount': totalCount
                        }
                        arr.push(temp)
                    }
                }

                console.timeEnd('Count filtering')

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

module.exports = new RecordsService()
