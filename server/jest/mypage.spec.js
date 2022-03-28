jest.mock('../models');
jest.mock('../middlewares/auth-middleware');
jest.mock('../modules/calcProperty');
const mypageCtl = require('../controller/mypage');

jest.mock('../models');
const User = require('../models/user');
const ProofShot = require('../models/proofShot');
const Character = require('../models/character');

test('req에 status가 주어졌을때 내가 참여한 첼린지 중에서 해당 status에 해당하는 첼린지를 받아온다.', async () => {
    User.findOne = jest.fn(() => ({
        lean: () => ({
            populate: () => ({
                participate: [
                    {
                        _id: 1,
                        title: 'testTitle',
                        content: 'testContent',
                        participants: 3,
                        thumbnail: 'testUrl',
                        startAt: '2022-03-14',
                        status: 2,
                    },
                    {
                        _id: 2,
                        title: 'testTitle2',
                        content: 'testContent2',
                        participants: 5,
                        thumbnail: 'testUrl2',
                        startAt: '2022-03-15',
                        status: 1,
                    },
                ],
                userId: '',
            }),
        }),
    }));

    //도대체 왜??? filter에서 x는 안되고 다른거는 되는건데?????
    //에??????????????????????

    let res = await mypageCtl.getMyChallenge(
        { query: { status: 2 } },
        {
            locals: { user: '' },
            status: () => {
                return { json: (el) => el };
            },
        }
    );

    expect(res).toEqual({
        challenges: [
            {
                _id: 1,
                challengeId: 1,
                title: 'testTitle',
                content: 'testContent',
                participants: 3,
                thumbnail: 'testUrl',
                startAt: '2022-03-14',
                status: 2,
            },
        ],
    });
});

test('req에 status가 주어지지 않으면 내가 참여했던 모든 첼린지를 정렬된 형태로 가져온다.', async () => {
    User.findOne = jest.fn(() => ({
        lean: () => ({
            populate: () => ({
                participate: [
                    {
                        _id: 1,
                        title: 'testTitle',
                        content: 'testContent',
                        participants: 3,
                        thumbnail: 'testUrl',
                        startAt: '2022-03-14',
                        status: 2,
                    },
                    {
                        _id: 2,
                        title: 'testTitle2',
                        content: 'testContent2',
                        participants: 5,
                        thumbnail: 'testUrl2',
                        startAt: '2022-03-15',
                        status: 1,
                    },
                ],
                userId: '',
            }),
        }),
    }));

    let res = await mypageCtl.getMyChallenge(
        {
            query: {
                status: '',
            },
        },
        {
            locals: {
                user: '',
            },
            status: () => {
                return { json: (el) => el };
            },
        }
    );

    expect(res).toEqual({
        challenges: [
            {
                _id: 2,
                challengeId: 2,
                title: 'testTitle2',
                content: 'testContent2',
                participants: 5,
                thumbnail: 'testUrl2',
                startAt: '2022-03-15',
                status: 1,
            },
            {
                _id: 1,
                challengeId: 1,
                title: 'testTitle',
                content: 'testContent',
                participants: 3,
                thumbnail: 'testUrl',
                startAt: '2022-03-14',
                status: 2,
            },
        ],
    });
});

test('내 인증샷 모아보기 API 정상 실행 시 json() 이 호출된다', async () => {
    ProofShot.find = jest.fn(() => ({
        select: () => ({
            lean: () => [
                {
                    _id: 1,
                    imgUrl: 'testUrl',
                    createdAt: '2022-03-10',
                },
                {
                    _id: 2,
                    imgUrl: 'testUrl2',
                    createdAt: '2022-03-15',
                },
            ],
        }),
    }));

    const mockedJson = jest.fn();
    await mypageCtl.getMyProofShot(
        {},
        {
            locals: {
                user: {
                    _id: '',
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );
    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        proofShots: [
            {
                _id: 1,
                proofShotId: 1,
                imgUrl: 'testUrl',
                createdAt: '2022-03-10',
            },
            {
                _id: 2,
                proofShotId: 2,
                imgUrl: 'testUrl2',
                createdAt: '2022-03-15',
            },
        ],
    });
});
test('캐릭터 정보조회 API가 정상 실행시 character에 nickname, totalparticipteCount, totalProofCount 프로퍼티가 추가되어 반환된다.', async () => {
    const mockedPopulate = jest.fn();
    const mockedJson = jest.fn();
    Character.find = jest.fn(() => ({
        select: () => ({
            lean: () => ({
                populate: () => [
                    {
                        characterId: 1,
                        userId: 1,
                        characterPoint: 1,
                        createdAt: 1,
                        equippedItems: {
                            itemId: 1,
                            imgUrl: 'testUrl',
                        },
                    },
                ],
            }),
        }),
    }));

    User.findById = jest.fn();
    User.findById.mockResolvedValue({
        nickname: 'testnick',
        participate: [1],
    });

    ProofShot.find = jest.fn(() => {});
    ProofShot.find.mockResolvedValue({
        length: 1,
    });

    let res = await mypageCtl.getCharacterInfo(
        {},
        {
            locals: {
                user: {
                    _id: '',
                },
            },
            status: () => {
                return { json: mockedJson };
            },
        }
    );

    expect(Character.find).toHaveBeenCalledTimes(1);
    expect(User.findById).toHaveBeenCalledTimes(1);
    expect(ProofShot.find).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        character: {
            nickname: 'testnick',
            totalParticipateCount: 1,
            totalProofCount: 1,
            characterId: 1,
            userId: 1,
            characterPoint: 1,
            createdAt: 1,
            equippedItems: {
                itemId: 1,
                imgUrl: 'testUrl',
            },
        },
    });
});
