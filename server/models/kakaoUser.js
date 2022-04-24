const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Challenges = require('./challenge');
const saltRounds = 10;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        likes: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenges' }],
        },
        participate: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenges' }],
        },
    },
    { timestamps: true } // createdAt, updatedAt 으로 Date형 객체 입력)
);

userSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('kakaoUsers', userSchema);
