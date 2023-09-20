const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('init config db');
        mongoose.connect(process.env.DB_CNN, {
            // userNewUrlParser: true,
            // userUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('here: ', process.env.DB_CNN)

    } catch (e) {
        console.log(error);
        throw new Error('Error in the db while trying to connect');
    }


}

module.exports = {
    dbConnection
}