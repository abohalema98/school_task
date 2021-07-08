const express = require('express');
const mongoose = require('mongoose');
const { usersValidation } = require('../Validation/validations');
mongoose.set('useFindAndModify', false);
const _lodash = require('lodash');
const bcrypt = require('bcrypt');
const verifyToken = require('../Controllers/verfiyToken');
const userRouter = express.Router();

require('../Model/UserModel')
let userSchema = mongoose.model('users')


userRouter.route('/users')
  .post(async (req, res) => {
    // const user = await userSchema.findOne({ _id: req.params.id })
    // if (user) {
    //   res.status(200).json({
    //     msg: "user is stord",
    //     user: user
    //   })
    // } else {
    //   res.status(400).json({ msg: "user not found" })
    // }
    console.log(req.params)
  })
  .get(async (request, response) => {

    await userSchema.find({})
      .then((data) => { response.send(data) })
      .catch((err) => { throw new Error(err) })
  })

  .put(async (request, response) => {
    const hashedPassword = await bcrypt.hashSync(request.body.password, 8)
    userSchema.updateOne({ _id: request.body.id }, {
      $set: { name: request.body.name, password: hashedPassword }
    })
      .then((UpdatedItem) => {
        response.send(UpdatedItem)
      })
      .catch((err) => {
        response.sendStatus(400).send(err.details[0].message)
      })
  })

  .delete(async (request, response) => {
    await userSchema.deleteOne({ _id: request.body.id })
      .then((data) => { response.send(data) })
      .catch((err) => { response.send(err) })
  })


module.exports = userRouter;
