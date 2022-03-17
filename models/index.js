const mongoose = require('mongoose');
require('dotenv').config();

// ec2 데이터베이스
// const connect = () => {
//     mongoose
//         .connect(process.env.MONGO_DB, {
//             ignoreUndefined: true,
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// };

const connect = () => {
    mongoose
        .connect(process.env.AWS_MONGO_DB, {
            ignoreUndefined: true,
            useNewUrlParser: true,
        })
        .catch((err) => console.log(err));
};
module.exports = connect;
