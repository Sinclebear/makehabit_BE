const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Item = require('../models/item');
const authMiddleware = require('../middlewares/auth-middleware');

// 아이템 조회 API // 이중정렬 도전 얘만하면 잘 수있음..
router.get('/', authMiddleware, async (req, res) => {
    if (!res.locals.user) {
        res.status(401).json({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    try {
        const { userId } = res.locals.user;
        const existCharacter = await Character.findOne(
            { userId },
            { characterCurrentPoint: 1, equippedItems: 1, haveItems: 1 }
        );
        const { characterCurrentPoint, equippedItems, haveItems } = existCharacter; // isEquip이랑 isOwned 만들기 위한 포석
        const items = await Item.find({}).sort({ category: 1, categoryItemNum: 1 }).lean(); // 이중정렬 그런데 이거 말고 내 마음대로 정렬할 수 있는 방법?!
        items.map((item) => {
            const itemId = item._id;
            item.itemId = itemId;
            if (equippedItems.includes(itemId)) {
                item.isEquip = true;
            } else {
                item.isEquip = false;
            }
            if (haveItems.includes(itemId)) {
                item.isOwned = true;
            } else {
                item.isOwned = false;
            }
        });
        res.status(200).json({ items, characterCurrentPoint });
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
});

// 아이템 추가 API 해치운듯
router.post('/', authMiddleware, async (req, res) => {
    if (!res.locals.user) {
        res.status(401).json({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    try {
        const { userId } = res.locals.user;
        const { totalPrice, items } = req.body;
        const existCharacter = await Character.findOne({ userId });
        const { characterCurrentPoint, haveItems } = existCharacter; // if문에서 사용하는 애들 빼두기
        const newPrice = characterCurrentPoint - totalPrice; //금액 계산부분
        if (!totalPrice) {
            // 구매한 아이템이 없으니까 장착만
            await Character.updateOne({ userId }, { $set: { equippedItems: items } });
            res.status(201).json({
                message: '아이템 장착 완료',
            });
            return;
        } else if (newPrice < 0) {
            //금액이 부족하니까 못삼
            res.status(400).json({
                message: '포인트가 부족합니다.',
            });
            return;
        } else {
            console.log('구매가능');
            //여기는 새로운 아이템 찾아서 haveItems에 추가하는 부분
            items.map((item) => {
                if (!haveItems.includes(item)) {
                    haveItems.push(item);
                }
            });
            //가격이랑 equippedItems이랑 haveItems 수정
            await Character.updateOne(
                { userId },
                { $set: { characterCurrentPoint: newPrice, equippedItems: items, haveItems } }
            );
            res.status(201).json({ message: '구매완료' });
        }
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
});

module.exports = router;
