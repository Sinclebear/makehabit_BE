const mongoose = require('mongoose');
require('dotenv').config();
const connect = () => {
    mongoose
        .connect(process.env.AWS_MONGO_DB, {
            ignoreUndefined: true,
            useNewUrlParser: true,
        })
        .catch((err) => console.log(err));
};
module.exports = connect;
