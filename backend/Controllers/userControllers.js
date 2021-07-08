let router = require('express').Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let { loginValidation, usersValidation } = require('../Validation/validations')

let mongoose = require('mongoose')


require('../Model/UserModel')
let User = mongoose.model('users')


router.post('/userLogin', async (request, response) => {
  const { error } = loginValidation(request.body)

  if (error) {
    response.status(400).send(error.details[0].message)
  };
  const user = await User.findOne({ email: request.body.email })
  // console.log(user.type)

  if (!user) {
    return response.status(400).send(`email doen't  exists `)
  }

  const validPassword = await bcrypt.compare(request.body.password, user.password)

  if (!validPassword) {
    response.status(400).send(`invalid password`)

  }
  const token = jwt.sign({ email: user.email, name: user.name }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXP
  })


  response.header('Authorization', "Bearer " + token).status(200).json({
    token:token,
    expiresIn:1000

  })

})

router.post('/signup',async (request, response) => {
  const { error } = usersValidation(request.body)

  if (error) {
    return response.status(500).send(error.details[0].message)
  };

  const emailExists = await User.findOne({ email: request.body.email })
  if (emailExists) {
    return response.status(400).send(`email already exists ${emailExists.email}`)
  }
  const hashedPassword = await bcrypt.hashSync(request.body.password, 8)

  let userObject = new User({
    name: request.body.name,
    email: request.body.email,
    password: hashedPassword,
    role: request.body.role,
  })

  userObject.save()
    .then(() => {
      response.status(201).json({
        massage: "User Signup Successfly"
      })
    })
    .catch(err => { response.status(500).send(err) })


})

module.exports = router;


