const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const _lodash = require('lodash');
const bcrypt = require('bcrypt');
const studentsRouter = express.Router();

require('../Model/students')
let studentsSchema = mongoose.model('students')


studentsRouter.route('/students')

  .get(async (req, res) => {
    await studentsSchema.find({})
      .then((data) => { res.send(data) })
      .catch((err) => { res.status(404).send(err) })
  })

  module.exports = studentsRouter;
