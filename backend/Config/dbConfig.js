const mongoose = require('mongoose')



// mongoose configration
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const DB_CONNECTION = async () => {

  try {
    const connect = await mongoose.connect(process.env.DB_Connection,
      { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
    console.log(`DB Connected`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }


}

module.exports = DB_CONNECTION
