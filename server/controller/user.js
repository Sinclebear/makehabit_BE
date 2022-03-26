const User = require('../models/user');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const Character = require('../models/character');
// 회원가입시 각 입력 항목 유효성 검사
// 이메일, 닉네임 체크 api 에서도 사용하기 위해 각 validation(joi obj) 분리
const email_validation = joi.object({
    email: joi.string().email().trim(true).required(),
});

const nickname_validation = joi.object({
    //nickname은 3~15 영어,한자,숫자
    nickname: joi
        .string()
        .pattern(/^[A-Za-z0-9가-힣]{3,15}$/)
        .trim(true)
        .required(),
});
const password_validation = joi.object({
    //password는 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
    password: joi
        .string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)
        .required(),
});

// 회원가입 API
async function signup(req, res) {
    try {
        const { email, nickname, password, confirmPassword } = req.body;
        await email_validation.validateAsync({ email });
        await nickname_validation.validateAsync({ nickname });
        await password_validation.validateAsync({ password });

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: '비밀번호가 일치하지 않습니다.',
            });
        }
        const existEmail = await User.findOne({ email }).exec();
        if (existEmail) {
            return res.status(400).json({
                message: '이미 가입된 이메일입니다.',
            });
        }

        const existNickname = await User.findOne({ nickname }).exec();
        if (existNickname) {
            return res.status(400).json({
                message: '이미 사용중인 닉네임입니다.',
            });
        }

        const user = new User({ email, nickname, password, proofCnt: 0 });
        await user.save();
        await Character.create({
            userId: user._id,
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
        return res.status(201).json({ message: '회원가입이 완료되었습니다!' });
    } catch (error) {
        let joiError = error.details[0].message;
        console.log(joiError);
        if (joiError.includes('email')) {
            res.status(400).json({
                message: '이메일 형식을 확인해주세요.',
            });
        }
        if (joiError.includes('nickname')) {
            res.status(400).json({
                message: '닉네임은 3자 이상, 15자 이하의 영어,한글,숫자로만 구성되어야 합니다.',
            });
        }
        if (joiError.includes('password')) {
            res.status(400).json({
                message:
                    '비밀번호는 8자 이상, 16자 이하로 구성되며, 문자와 숫자 및 특수 문자가 모두 포함 되어야 합니다.',
            });
        }
    }
}

// 로그인 API
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        //email에 해당하는 유저가 없는 경우
        if (!user) {
            return res.status(400).json({
                result: '이메일이나 비밀번호를 확인해주세요.',
            });
        }

        //password 해당하는 유저가 없는 경우
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword) {
            return res.status(400).json({
                message: '이메일이나 비밀번호를 확인해주세요!',
            });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        return res.status(201).json({
            token,
            nickname: user.nickname,
            message: '로그인 되었습니다.',
        });
    } catch (err) {
        res.status(400).json({
            message: '이메일과 비밀번호를 모두 입력해주세요.',
        });
    }
}

//checkEmail
async function checkEmail(req, res) {
    try {
        const { email } = await email_validation.validateAsync(req.body);
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(200).json({ message: '사용 가능한 이메일 입니다.' });
        } else {
            return res.status(400).json({ message: '이미 가입된 이메일 입니다.' });
        }
    } catch (error) {
        let joiError = error.details[0].message;
        console.log(joiError);
        return res.status(400).json({
            message: '이메일 형식을 확인해주세요.',
        });
    }
}

//닉네임 중복 체크
async function checkNickname(req, res) {
    try {
        const { nickname } = await nickname_validation.validateAsync(req.body);
        const user = await User.findOne({ nickname }).exec();
        if (!user) {
            return res.status(200).json({ message: '사용 가능한 닉네임 입니다.' });
        } else {
            return res.status(400).json({ message: '이미 가입된 닉네임 입니다.' });
        }
    } catch (error) {
        return res.status(400).json({
            message: '닉네임은 3자 이상, 15자 이하의 영어,한자,숫자로만 구성되어야 합니다.',
        });
    }
}

// 로그인 체크
async function checkLogin(req, res) {
    const { user } = res.locals; // user object
    if (user === undefined) {
        return res.status(400).json({ message: '로그인 후 사용하시오' });
    }
    res.status(200).json({
        email: user.email,
        nickname: user.nickname,
    });
}

async function callUserRanking(req, res) {
    const { user } = res.locals; // user object
    const { length } = req.query;

    let RankingList;
    RankingList = await User.find({}, { _id: 1, nickname: 1, proofCnt: 1 })
        .sort({ proofCnt: -1 })
        .lean();

    // 캐릭터 옷 입는 순서를 맞출 기준이 되는 배열 item_order
    let item_order = ['background', 'color', 'clothes', 'acc', 'emotion'];

    //유저 캐릭터 정보 끼워넣기
    RankingList = await Promise.all(
        RankingList.map(async (x) => {
            let [character] = await Character.find({ userId: x._id }, { equippedItems: 1 })
                .lean()
                .populate({
                    path: 'equippedItems',
                    select: { _id: 0, category: 1, itemImgUrl: 1 },
                });
            //item_order 에 맞게 아이템 정렬
            character.equippedItems.sort(
                (a, b) => item_order.indexOf(a.category) - item_order.indexOf(b.category)
            );
            x.equippedItems = character.equippedItems;
            return x;
        })
    );

    //랭킹 계산하기
    let rank = 0;
    let before = -1;
    RankingList = RankingList.map((x) => {
        if (x.proofCnt != before) {
            rank++;
            before = x.proofCnt;
        }
        x.rank = rank;
        return x;
    });

    if (user === undefined) {
        RankingList = RankingList.slice(0, length);
        res.status(200).json({ RankingList });
    } else {
        let me = RankingList.find((el) => el.nickname == user.nickname);
        RankingList = RankingList.slice(0, length);
        res.status(200).json({ me, RankingList });
    }
}

module.exports = {
    signup,
    login,
    checkEmail,
    checkNickname,
    checkLogin,
    callUserRanking,
};
