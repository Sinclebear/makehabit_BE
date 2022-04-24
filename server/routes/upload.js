const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const uploadCtl = require('../controller/upload');

//api
//image upload to s3 사진 1개씩 저장
router.post('/image', upload, uploadCtl.imageUpload);

module.exports = router;
