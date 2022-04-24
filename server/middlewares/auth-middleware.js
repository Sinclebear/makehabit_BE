const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === 'Bearer null' || authorization === undefined) {
        res.locals.user = undefined;
        next();
        return;
    }

    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType != 'Bearer') {
        res.status(401).send({
            message: '로그인 후 사용하시오',
        });
        return;
    }

    try {
        const { email } = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);

        User.findOne({ email })
            .exec()
            .then((user) => {
                res.locals.user = user;
                next();
            });
    } catch (error) {
        //jwt 토큰이 유효하지 않은 경우
        return res.status(401).send({
            user: null,
            message: '로그인 후 사용하시오',
        });
    }
};
