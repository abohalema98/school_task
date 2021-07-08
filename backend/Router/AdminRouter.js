let express = require('express');
let mongoose = require('mongoose')
let { usersValidation } = require('../Validation/validations')
mongoose.set('useFindAndModify', false);
let _lodash = require('lodash')
const bcrypt = require('bcrypt')


let adminRouter = express.Router();
require('../Model/AdminModel')
let adminSchema = mongoose.model('admins')


adminRouter.route('/admin')

    .get(async (request, response) => {

        await adminSchema.find({})
            .then((data) => { response.send(data) })
            .catch((err) => { throw new Error(err) })
    })

    .post(async (request, response) => {

        const { error } = usersValidation(request.body)

        if (error) {
            return response.status(400).send(error.details[0].message)
        };

        const emailExists = await adminSchema.findOne({ email: request.body.email });

        if (emailExists) { return response.status(400).send(`email already exists ${emailExists.email}`) }

        const hashedPassword = await bcrypt.hashSync(request.body.password, 8)

        let adminObject = new adminSchema({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
            role: request.body.role,
        })

        try {
            const savedObject = await adminObject.save()
            response.send(_lodash.pick(savedObject, ['_id', 'name', 'email', 'password', 'role']))
        } catch (err) {
            response.status(400).send(err)
        }



    }) // Post 

    .put(async (request, response) => {
        await adminSchema.replaceOne({ _id: request.body.id }, {
            $set: { name: request.body.name, password: request.body.password, email: request.body.email, role: request.body.role }
        })
            .then((dataUpdate) => { response.send(dataUpdate) })
            .catch((err) => { response.sendStatus(400) })
    })

    .delete(async (request, response) => {
        await adminSchema.deleteOne({ _id: request.body.id })

            .then((data) => { response.send(data) })
            .catch((err) => { response.send(err) })

    })



module.exports = adminRouter;