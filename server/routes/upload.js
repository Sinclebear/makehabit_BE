const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const uploadCtl = require('../controller/upload');
//image upload to s3 사진 1개씩 저장, upload.single or
router.post('/image', upload.single('image'), uploadCtl.imageUpload);

// // 이미지 저장 여러 개
// router.post('/image', upload.array('image', 5), async (req, res) => {
//     try {
//         let image_urls = new Array();
//         for (let i = 0; i < req.files.length; i++) {
//             console.log('location : ', req.files[i].location);
//             image_urls[i] = await req.files[i].location;
//             console.log(image_urls[i]);
//         }
//         // 이미지가 아무것도 없는 경우
//         if (image_urls.length === 0) {
//             return res.status(400).json({ message: '첨부된 이미지가 없습니다.' });
//         }
//         // res.status(200).send(util.success(200, '요청 성공', image));
//         res.status(200).json({ imgUrl: image_urls });
//     } catch (e) {
//         console.log(e);
//     }
// });

module.exports = router;
