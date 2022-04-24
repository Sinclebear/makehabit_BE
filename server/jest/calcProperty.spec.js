jest.mock('../models');
jest.mock('../middlewares/auth-middleware');
const User = require('../models/user');
const ProofShot = require('../models/proofShot');
const calcProperty = require('../modules/calcProperty');

test('각 challenge에 대해 userLikes 안에 challengeId(_id) 가 존재하면 isLike=true 를 넣어준다.', async () => {
    User.findById = jest.fn();
    User.findById.mockResolvedValue({ likes: [1, 2, 3, 4] });

    let challenges = [{ _id: 1 }, { _id: 4 }, { _id: 5 }];
    await calcProperty.calcIsLike(challenges, 'user');
    expect(challenges).toEqual([
        { _id: 1, isLike: true },
        { _id: 4, isLike: true },
        { _id: 5, isLike: false },
    ]);
});

test('각 challenge에 대해 participate 안에 challengeId(_id)가 존재하면 isParticipate=true를 넣어준다.', async () => {
    User.findById = jest.fn();
    User.findById.mockResolvedValue({ participate: [1, 2, 3, 4] });

    let challenges = [{ _id: 1 }, { _id: 4 }, { _id: 5 }];
    await calcProperty.calcIsParticipate(challenges, 'user');
    expect(challenges).toEqual([
        { _id: 1, isParticipate: true },
        { _id: 4, isParticipate: true },
        { _id: 5, isParticipate: false },
    ]);
});

test('챌린지 리스트가 주어졌을 때 각 첼린지의 startAt 기준으로 status 값을 계산해 삽입해준다.', async () => {
    let challenges = [
        { startAt: new Date('2022-03-06') },
        { startAt: new Date('2022-03-15') },
        { startAt: new Date('2021-05-12') },
    ];
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 2, 10));
    await calcProperty.calcStatus(challenges);
    jest.useRealTimers();
    expect(challenges).toEqual([
        { startAt: new Date('2022-03-06'), status: 0 },
        { startAt: new Date('2022-03-15'), status: 1 },
        { startAt: new Date('2021-05-12'), status: 2 },
    ]);
});

test('첼린지 리스트가 주어졌을때 각 첼린지에 대해 참여자 수를 계산해서 삽입한다.', async () => {
    let challenges = [
        { participants: [1, 2, 3, 4, 5, 6] },
        { participants: [1, 2, 3] },
        { participants: [1, 2, 3, 4, 5] },
    ];
    await calcProperty.calcParticipants(challenges);
    expect(challenges).toEqual([{ participants: 6 }, { participants: 3 }, { participants: 5 }]);
});

test('첼린지 리스트가 주어졌을때 각 첼리지에 대해 인증 횟수를 삽입해서 돌려준다.', async () => {
    ProofShot.count = jest.fn();
    ProofShot.count.mockResolvedValueOnce(3);
    ProofShot.count.mockResolvedValueOnce(1);
    ProofShot.count.mockResolvedValue(5);

    let challenges = [{ _id: 1 }, { _id: 4 }, { _id: 5 }];
    await calcProperty.calcProofCnt(challenges, 'user');
    expect(challenges).toEqual([
        { _id: 1, proofCount: 3 },
        { _id: 4, proofCount: 1 },
        { _id: 5, proofCount: 5 },
    ]);
});

test('경과 날짜, round 계산', async () => {
    Date.now = jest.fn(() => new Date('2022-03-10T15:00:00.000Z'));

    let challenges = [
        { startAt: new Date('2022-03-06T15:00:00Z') }, //UTC 2022-03-05 15:00
        { startAt: new Date('2022-03-15T15:00:00Z') }, //UTC 2022-03-14 15:00
        { startAt: new Date('2022-02-08T15:00:00Z') }, //UTC 2022-02-07 15:00
    ];
    await calcProperty.calcPastDaysAndRound(challenges);
    expect(challenges).toEqual([
        { startAt: new Date('2022-03-06T15:00:00Z'), pastDays: 5, round: 2 },
        { startAt: new Date('2022-03-15T15:00:00Z'), pastDays: -4, round: -1 },
        { startAt: new Date('2022-02-08T15:00:00Z'), pastDays: 31, round: 10 },
    ]);
});

test('', async () => {
    ProofShot.findOne = jest.fn();
    ProofShot.findOne.mockResolvedValueOnce(true);
    ProofShot.findOne.mockResolvedValueOnce(false);
    ProofShot.findOne.mockResolvedValue(true);

    let challenges = [{ _id: 1 }, { _id: 4 }, { _id: 5 }];
    await calcProperty.calcUserIsUpload(challenges, 'user');
    expect(challenges).toEqual([
        { _id: 1, isUpload: true },
        { _id: 4, isUpload: false },
        { _id: 5, isUpload: true },
    ]);
});
