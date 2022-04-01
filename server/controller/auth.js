const jwt = require('jsonwebtoken');
const passport = require('passport');

//카카오 콜백 컨트롤러
const kakaoCallback = (req, res, next) => {
    passport.authenticate('kakao', { failureRedirect: '/' }, (err, user, info) => {
        // console.log('kakaoCallback err 이전');
        if (err) return next(err);
        // console.log('kakaoCallback err 이후');
        const { email, nickname } = user;
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        // console.log('token jwt signed');
        //return 제거
        // res.status(201).json({
        res.send({
            token,
            nickname,
            message: '로그인 되었습니다.',
        });
    })(req, res, next);
};

module.exports = {
    kakaoCallback,
};
