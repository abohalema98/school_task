require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./Router/UserRouter')
const adminRouter = require('./Router/AdminRouter')
const resetpasswordRouter = require('./Controllers/resetPassword')
const authUserController = require('./Controllers/userControllers')
const DB_CONNECTION = require('./Config/dbConfig')
const cors = require('cors')


// DB Config
DB_CONNECTION();


// CORS-enabled
app.use(cors());


//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
});


app.get('/', (request, response, next) => {
    response.send('server is run successfly')
    next()
})

// Router
app.use('/api/auth/user', authUserController);
app.use('/api', resetpasswordRouter);
app.use('/auth', userRouter)
app.use('/auth', adminRouter)


const Port = process.env.Port

app.listen(Port, () => {
    console.log('Server is listen...... ' + Port)
})
