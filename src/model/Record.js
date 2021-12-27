const Mongoose = require('mongoose')

const RecordSchema = new Mongoose.Schema(
    {
        key: String,
        value: String,
        counts: {type: [Number]},
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('records', RecordSchema)
