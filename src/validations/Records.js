const JoiDate = require('@joi/date')
let Joi = require('joi')

Joi = Joi.extend(JoiDate)

const queryRecord = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').required(),
    endDate: Joi.date().format('YYYY-MM-DD').required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required()
});

module.exports = queryRecord