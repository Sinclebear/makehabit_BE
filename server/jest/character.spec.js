jest.mock('../models');
jest.mock('../middlewares/auth-middleware');
jest.mock('../modules/calcProperty');
const characterCtl = require('../controller/character');

jest.mock('../models');
const Character = require('../models/character');
const User = require('../models/user');
const Item = require('../models/item');
test('getAllItems() 정상 작동 시', async () => {
    Character.findOne = jest.fn();
    Character.findOne.mockResolvedValue({
        characterCurrentPoint: 1000,
        equippedItems: [1, 2, 3],
        haveItems: [1, 2, 3, 4, 5],
    });

    User.updateOne = jest.fn();
    const mockedJson = jest.fn();

    Item.find = jest.fn();
    Item.find.mockImplementationOnce(() => ({
        select: () => ({
            sort: () => ({
                lean: jest.fn().mockResolvedValue([
                    { itemId: 1, isEquip: false, isOwned: false },
                    { itemId: 2, isEquip: false, isOwned: false },
                    { itemId: 3, isEquip: false, isOwned: false },
                    { itemId: 4, isEquip: false, isOwned: false },
                    { itemId: 5, isEquip: false, isOwned: false },
                    { itemId: 6, isEquip: false, isOwned: false },
                    { itemId: 7, isEquip: false, isOwned: false },
                ]),
            }),
        }),
    }));

    let res = await characterCtl.getAllItems(
        {},
        {
            locals: { user: { userId: 10 } },
            status: () => {
                return { json: mockedJson };
            },
        }
    );

    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({
        characterCurrentPoint: 1000,
        items: [
            { itemId: 1, isEquip: true, isOwned: true },
            { itemId: 2, isEquip: true, isOwned: true },
            { itemId: 3, isEquip: true, isOwned: true },
            { itemId: 4, isEquip: false, isOwned: true },
            { itemId: 5, isEquip: false, isOwned: true },
            { itemId: 6, isEquip: false, isOwned: false },
            { itemId: 7, isEquip: false, isOwned: false },
        ],
    });
});

test('buyOrChangeItem() 정상 작동 시', async () => {
    Character.findOne = jest.fn();
    Character.findOne.mockResolvedValue({
        characterCurrentPoint: 1500,
        equippedItems: [1, 2, 3],
        haveItems: [1, 2, 3, 4, 5],
    });
    Character.updateOne = jest.fn();
    const mockedJson = jest.fn();

    Item.find = jest.fn();
    Item.find.mockImplementationOnce(() => ({
        select: () => ({
            sort: () => ({
                lean: jest.fn().mockResolvedValue([
                    { itemId: 1, isEquip: false, isOwned: false },
                    { itemId: 2, isEquip: false, isOwned: false },
                    { itemId: 3, isEquip: false, isOwned: false },
                    { itemId: 4, isEquip: false, isOwned: false },
                    { itemId: 5, isEquip: false, isOwned: false },
                    { itemId: 6, isEquip: false, isOwned: false },
                    { itemId: 7, isEquip: false, isOwned: false },
                ]),
            }),
        }),
    }));

    let res = await characterCtl.buyOrChangeItem(
        {
            body: {
                totalPrice: 1000,
                items: [5, 6, 7],
            },
        },
        {
            locals: { user: { userId: 10 } },
            status: () => {
                return { json: mockedJson };
            },
        }
    );

    expect(Character.updateOne).toHaveBeenCalledWith(
        { userId: 10 },
        {
            $set: {
                characterCurrentPoint: 500,
                equippedItems: [5, 6, 7],
                haveItems: [1, 2, 3, 4, 5, 6, 7],
            },
        }
    );
    expect(mockedJson).toHaveBeenCalledTimes(1);
    expect(mockedJson).toHaveBeenCalledWith({ message: '구매완료' });
});

// test('searchChallenge() 에 정상적인 값 입력시 res.json 이 호출된다.', async () => {
//     const mockedLean = jest.fn();
//     const mockedJson = jest.fn();
//     mockedLean.mockResolvedValue([
//         {
//             _id: 1,
//             startAt: new Date('2022-03-15'),
//         },
//         {
//             _id: 1,
//             startAt: new Date('2022-03-10'),
//         },
//     ]);
//     Challenge.find = jest.fn(() => ({ lean: mockedLean }));

//     let res = await challengeCtl.searchChallenge(
//         {
//             query: {
//                 title: '',
//             },
//         },
//         {
//             locals: {
//                 user: '',
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         challenges: [
//             {
//                 _id: 1,
//                 startAt: new Date('2022-03-15'),
//             },
//             {
//                 _id: 1,
//                 startAt: new Date('2022-03-10'),
//             },
//         ],
//     });
// });

// test('getCategoryList() 의 카테고리에 all,new 이외의 정상적인 값 입력시 res.json 이 호출된다.', async () => {
//     const mockedLean = jest.fn();
//     const mockedJson = jest.fn();
//     mockedLean.mockResolvedValue([{ _id: 1 }, { _id: 1 }]);
//     Challenge.find = jest.fn(() => ({
//         limit: () => ({
//             lean: mockedLean,
//         }),
//     }));

//     let res = await challengeCtl.getCategoryList(
//         {
//             params: {
//                 categoryId: '',
//             },
//             query: {
//                 length: '',
//             },
//         },
//         {
//             locals: {
//                 user: '',
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         challenges: [{ _id: 1 }, { _id: 1 }],
//     });
// });

// //챌린지 작성 API 테스트 코드 임시 생략

// //

// test('joinChallenge() 정상 작동 시', async () => {
//     const mockedJson = jest.fn();
//     Challenge.findById = jest.fn();
//     Challenge.findById.mockImplementationOnce(() => ({
//         lean: jest.fn().mockReturnValue({
//             status: 1,
//         }),
//     }));
//     Challenge.findById.mockResolvedValue({
//         _id: 1,
//         status: 1,
//         participants: [1, 2, 4, 5],
//     });

//     User.findById = jest.fn();
//     User.findById.mockResolvedValue({
//         participate: [6, 13, 14, 16, 17],
//     });
//     Challenge.updateOne = jest.fn();
//     User.updateOne = jest.fn();

//     let res = await challengeCtl.joinChallenge(
//         {
//             params: {
//                 challengeId: 3,
//             },
//         },
//         {
//             locals: {
//                 user: { userId: 10 },
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(Challenge.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 3,
//         },
//         { $set: { participants: [1, 2, 4, 5, 10] } }
//     );
//     expect(User.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 10,
//         },
//         {
//             $set: { participate: [6, 13, 14, 16, 17, 3] },
//         }
//     );
//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         message: '참여성공',
//     });
// });

// test('joinCancelChallenge() 정상 작동 시', async () => {
//     const mockedJson = jest.fn();
//     Challenge.findById = jest.fn();
//     Challenge.findById.mockImplementationOnce(() => ({
//         lean: jest.fn().mockReturnValue({
//             status: 1,
//         }),
//     }));
//     Challenge.findById.mockResolvedValue({
//         _id: 1,
//         status: 1,
//         participants: [1, 2, 4, 5, 10],
//     });

//     User.findById = jest.fn();
//     User.findById.mockResolvedValue({
//         participate: [6, 13, 14, 16, 17, 3],
//     });
//     Challenge.updateOne = jest.fn();
//     User.updateOne = jest.fn();

//     let res = await challengeCtl.joinCancelChallenge(
//         {
//             params: {
//                 challengeId: 3,
//             },
//         },
//         {
//             locals: {
//                 user: { userId: 10 },
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(Challenge.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 3,
//         },
//         { $set: { participants: [1, 2, 4, 5] } }
//     );
//     expect(User.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 10,
//         },
//         {
//             $set: { participate: [6, 13, 14, 16, 17] },
//         }
//     );
//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         message: '참여 취소 성공',
//     });
// });

// test('likeChallenge() 정상 작동 시', async () => {
//     const mockedJson = jest.fn();
//     User.findById = jest.fn();
//     User.findById.mockResolvedValue({
//         likes: [6, 13, 14, 16, 17],
//     });
//     User.updateOne = jest.fn();
//     let res = await challengeCtl.likeChallenge(
//         {
//             params: {
//                 challengeId: 3,
//             },
//         },
//         {
//             locals: {
//                 user: { userId: 10 },
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(User.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 10,
//         },
//         {
//             $set: { likes: [6, 13, 14, 16, 17, 3] },
//         }
//     );
//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         message: '찜하기 성공',
//     });
// });

// test('likeChallenge() 정상 작동 시 ', async () => {
//     const mockedJson = jest.fn();
//     User.findById = jest.fn();
//     User.findById.mockResolvedValue({
//         likes: [6, 13, 14, 16, 17, 3],
//     });
//     User.updateOne = jest.fn();
//     let res = await challengeCtl.likeCancelChallenge(
//         {
//             params: {
//                 challengeId: 3,
//             },
//         },
//         {
//             locals: {
//                 user: { userId: 10 },
//             },
//             status: () => {
//                 return { json: mockedJson };
//             },
//         }
//     );

//     expect(User.updateOne).toHaveBeenCalledWith(
//         {
//             _id: 10,
//         },
//         {
//             $set: { likes: [6, 13, 14, 16, 17] },
//         }
//     );
//     expect(mockedJson).toHaveBeenCalledTimes(1);
//     expect(mockedJson).toHaveBeenCalledWith({
//         message: '찜하기 취소 성공',
//     });
// });
