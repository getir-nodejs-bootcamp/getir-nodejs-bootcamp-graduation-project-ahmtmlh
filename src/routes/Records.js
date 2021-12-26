const express = require("express");
const RecordController = require("../controllers/records");
const validate = require('../middlewares/validate')
const queryRecordValidation = require('../validations/Records')

const router = express.Router();

router.route("/query").post(validate(queryRecordValidation, 'body'), RecordController.query);

module.exports = router;