const mongoose = require('mongoose')
let auto_increment = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_Connection, { useUnifiedTopology: true, useNewUrlParser: true })
auto_increment.initialize(connection);



let userSchema = new mongoose.Schema({

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
    verificationCode: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    ImageProfile: {
        type: String
    }


})


userSchema.plugin(auto_increment.plugin, { model: 'users', field: '_id', startAt: 1, incrementBy: 1 })
mongoose.model('users', userSchema)