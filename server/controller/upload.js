const express = require('express');
const router = express.Router();

//image upload to s3 사진 1개씩 저장
async function imageUpload(req, res) {
    try {
        const file = await req.file;
        const result = await file.location;

        //사진 경로가 있는 주소를  imgurl이라는 이름으로 저장
        res.status(200).json({ imgUrl: result });
    } catch (e) {
        console.log(e);
    }
}

module.exports = { imageUpload };
