const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
let mongoose = require('mongoose')
const resetPasswordRouter = express.Router();

require('../Model/UserModel')
let Users = mongoose.model('users')


resetPasswordRouter.route('/resetpassword')

  .post(async (request, response) => {
    let emailExists = await Users.findOne({ "email": request.body.email });
    let verificationCodeRandom = await Math.floor(100000 + Math.random() * 900000)

    try {
      if (emailExists) {

        let updateUserStatus = await Users.updateOne({ "email": emailExists.email }, {
          $set: {
            "verificationCode": verificationCodeRandom
          }
        })


        const transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.E_MAIL,
            pass: process.env.PASSWORD,
          },
        });


        transporter.sendMail({
          from: 'School System Support <meido2397@gmail.com>', // sender address
          to: emailExists.email, // list of receivers
          subject: "School System Support Reset Password ✔ ", // Subject line
          text: "There is a new message. It's about sending verificationCode, check it out!", // plain text body
          html: `
                    <b>Reset Password your verificationCode = </b>
                    <b> ${verificationCodeRandom}</b>
                    `, // html body
        })
        response.status(201).json({
          message:"Verification Code send successfly"
        })
      } else {
        response.send(`Email not found`)

      }
    } catch (error) {
      response.send(error)
    }

  })

  .put(async (request, response) => {
    let userData = await Users.findOne({ verificationCode: request.body.verificationCode })
    if (userData) {
      const hashedPassword = await bcrypt.hashSync(request.body.newpassword, 8)
      let dataUpdate = await Users.updateOne({ email: userData.email }, {
        $set: { password: hashedPassword }
      })
      response.status(200).send(dataUpdate)
    } else {
      response.send(`Verification Code wrong..!`)

    }

  })

module.exports = resetPasswordRouter;



