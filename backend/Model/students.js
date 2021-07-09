const mongoose = require('mongoose')
let connection = mongoose.createConnection(process.env.DB_Connection, { useUnifiedTopology: true, useNewUrlParser: true })



let studentsSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    BreastSize: {
        type: String,
        required: true,
    },
    ScheduleDestination: {
        type: String,
        required: true
    },
    Class: {
      type: Number,
      required: true
    }

})


mongoose.model('students', studentsSchema)
