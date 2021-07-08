const mongoose = require('mongoose')
let auto_increment = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_Connection, { useUnifiedTopology: true, useNewUrlParser: true })
auto_increment.initialize(connection);



let adminSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }


})


adminSchema.plugin(auto_increment.plugin, { model: 'admins', field: '_id', startAt: 1, incrementBy: 1 })
mongoose.model('admins', adminSchema)