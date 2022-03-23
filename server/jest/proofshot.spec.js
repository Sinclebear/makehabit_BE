jest.mock('../models');
jest.mock('../middlewares/auth-middleware');
jest.mock('../modules/calcProperty');
const proofShotCtl = require('../controller/proofshot');

jest.mock('../models');
const Character = require('../models/character');
const Challenge = require('../models/challenge');
const proofShot = require('../models/proofShot');
const User = require('../models/User');
//인증 페이지 조회
test('authProofshot() 정상 작동 시', async () => {
    const before = new Date('2022-03-05 00:00:00'); //UTC 03-04 15:00

    const mockedJson = jest.fn();

    Challenge.findById = jest.fn();
    Challenge.findById.mockImplementation(() => ({
        lean: jest.fn().mockResolvedValue({
            participants: [3, 11, 13, 14, 15, 16, 18],
            startAt: before, //2022-03-05
        }),
    }));

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 2, 10));
    let res = await proofShotCtl.authProofshot(
        {
            params: {
                challengeId: 3,
            },
        },
        {
            locals: {
                user: {
                    participate: [1, 2, 3, 4, 5],
                    userId: 10,
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );
    jest.useRealTimers();

    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        participants: 7,
        startAt: new Date('2022-03-05 00:00:00'),
        round: 2,
    });
});

test('uploadProofshot() 금일 이미 업로드한 proofShot이 있다면 업로드가 불가능하다.', async () => {
    const mockedJson = jest.fn();
    const mockedSave = jest.fn();
    Character.findOne = jest.fn().mockResolvedValue({
        characterCurrentPoint: 1000,
        save: mockedSave,
    });

    proofShot.find = jest.fn();
    proofShot.find.mockResolvedValue([1]); //오늘 이미 업로드한 인증샷이 있다.
    proofShot.create = jest.fn();
    proofShot.count = jest.fn().mockResolvedValue(2);
    //인증샷 개수 (포인트 지급 위해서) => 3의 배수:300  ,else : 100
    //jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {});
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 2, 10));

    await proofShotCtl.uploadProofshot(
        {
            params: {
                challengeId: 3,
            },
            body: {
                imgUrl: 'testUrl',
                challengeTitle: 'testTitle',
                comment: 'testComment',
            },
        },
        {
            locals: {
                user: {
                    participate: [1, 2, 3, 4, 5],
                    userId: 10,
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );
    jest.useRealTimers();

    expect(mockedSave).toHaveBeenCalledTimes(0);
    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        message: '오늘 이 챌린지에 이미 인증한 내역이 있습니다.',
    });
});

test('uploadProofshot() proofShot을 업로드 했을때 proofShot의 개수가 3의 배수라면 300원을 받고, User의 proofCnt를 1 증가시킨다.', async () => {
    const mockedJson = jest.fn();
    const mockedSave = jest.fn();
    Character.findOne = jest.fn().mockResolvedValue({
        characterCurrentPoint: 1000,
        save: mockedSave,
    });

    User.updateOne = jest.fn();
    proofShot.find = jest.fn();
    proofShot.find.mockResolvedValue([]); //오늘의 인증샷 없을 때
    proofShot.create = jest.fn();
    proofShot.count = jest.fn().mockResolvedValue(3);
    //인증샷 개수 (포인트 지급 위해서) => 3의 배수:300  ,else : 100
    //jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {});
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 2, 10));

    await proofShotCtl.uploadProofshot(
        {
            params: {
                challengeId: 3,
            },
            body: {
                imgUrl: 'testUrl',
                challengeTitle: 'testTitle',
                comment: 'testComment',
            },
        },
        {
            locals: {
                user: {
                    participate: [1, 2, 3, 4, 5],
                    _id: 10,
                    proofCnt: 1,
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );
    jest.useRealTimers();

    expect(User.updateOne).toHaveBeenCalledTimes(1);
    expect(User.updateOne).toHaveBeenCalledWith({ _id: 10 }, { $set: { proofCnt: 2 } });
    expect(mockedSave).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        point: 300,
        message: '인증샷 등록이 완료되었습니다.',
        totalCnt: 3,
    });
});
test('uploadProofshot() proofShot을 업로드 했을때 proofShot의 개수가 3의 배수가 아니라면 100원을 받고 proofCnt를 1 늘린다.', async () => {
    const mockedJson = jest.fn();
    const mockedSave = jest.fn();
    Character.findOne = jest.fn().mockResolvedValue({
        characterCurrentPoint: 1000,
        save: mockedSave,
    });

    User.updateOne = jest.fn();
    proofShot.find = jest.fn();
    proofShot.find.mockResolvedValue([]); //오늘의 인증샷 없을 때
    proofShot.create = jest.fn();
    proofShot.count = jest.fn().mockResolvedValue(2);
    //인증샷 개수 (포인트 지급 위해서) => 3의 배수:300  ,else : 100
    //jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {});
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 2, 10));

    await proofShotCtl.uploadProofshot(
        {
            params: {
                challengeId: 3,
            },
            body: {
                imgUrl: 'testUrl',
                challengeTitle: 'testTitle',
                comment: 'testComment',
            },
        },
        {
            locals: {
                user: {
                    participate: [1, 2, 3, 4, 5],
                    _id: 10,
                    proofCnt: 5,
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );
    jest.useRealTimers();

    expect(User.updateOne).toHaveBeenCalledTimes(1);
    expect(User.updateOne).toHaveBeenCalledWith({ _id: 10 }, { $set: { proofCnt: 6 } });

    expect(mockedSave).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        point: 100,
        message: '인증샷 등록이 완료되었습니다.',
        totalCnt: 2,
    });
});
