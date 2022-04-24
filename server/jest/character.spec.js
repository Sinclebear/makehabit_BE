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
