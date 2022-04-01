const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const Character = require('../models/character');
const User = require('../models/user.js');

module.exports = () => {
    // console.log('test');
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: process.env.KAKAO_CALLBACK_URL, // 카카오 로그인 Redirect URI 경로
            },

            // clientID에 카카오 앱 아이디 추가
            // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
            // accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
            // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
            async (accessToken, refreshToken, profile, done) => {
                //Oauth..
                // console.log('토큰 :', accessToken);
                // console.log('토큰 :', refreshToken);
                // console.log('kakao profile', profile);
                try {
                    const exUser = await User.findOne(
                        // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                        { email: profile.id, provider: 'kakao' }
                    );
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser); // 로그인 인증 완료
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            nickname: profile.username,
                            email: profile.id,
                            provider: 'kakao',
                            proofCnt: 0,
                        });
                        await Character.create({
                            userId: newUser._id,
                            characterCurrentPoint: 1000,
                            equippedItems: [
                                '62345f283a3469d4462a5e7f',
                                '62345f4c3a3469d4462a5e80',
                                '62345f683a3469d4462a5e81',
                                '62345f7b3a3469d4462a5e82',
                                '62345f933a3469d4462a5e83',
                            ],
                            haveItems: [
                                '62345f283a3469d4462a5e7f',
                                '62345f4c3a3469d4462a5e80',
                                '62345f683a3469d4462a5e81',
                                '62345f7b3a3469d4462a5e82',
                                '62345f933a3469d4462a5e83',
                                '623460b43a3469d4462a5e87',
                                '623460d03a3469d4462a5e88',
                                '623460e03a3469d4462a5e89',
                                '623460f43a3469d4462a5e8a',
                                '6234610b3a3469d4462a5e8b',
                                '6234611a3a3469d4462a5e8c',
                                '6234710aeb5273d0e96b1802',
                            ],
                        });
                        // console.log('37줄', newUser);
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
