const JoiDate = require('@joi/date')
let Joi = require('joi')

Joi = Joi.extend(JoiDate)

const queryRecord = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').min('1970-01-01').required(),
    endDate: Joi.date().format('YYYY-MM-DD').min('1970-01-01').required(),
    minCount: Joi.number().required().min(0),
    maxCount: Joi.number().required().min(0)
});

module.exports = queryRecord