const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const isValidDate = require('../validation/validations');

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const DbService = require('../db/db');

router.post('/enroll', [
    check('firstName').isLength({ min: 2 }),
    check('lastName').isLength({ min: 2 }),
    check('email').isEmail(),
    check('date').exists()
  ], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !isValidDate(req.body.date)) {
      return res.status(422).send("Validation fail! Provide correct data.");
    }

    const query = await DbService("INSERT", req.body);
    query ? res.send("User enrolled successfully.") : res.send("Error occured while performing db.");
});

module.exports = router;
