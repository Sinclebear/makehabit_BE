require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./modules/swagger');
const connect = require('./models/index');
const cors = require('cors');
const passportConfig = require('./passport'); //이애 연결해주고

const app = express();
const challengeRouter = require('./routes/challenge');
const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage');
const proofshotRouter = require('./routes/proofshot');
const uploadRouter = require('./routes/upload');
const characterRouter = require('./routes/character');
connect();

//body 읽기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
passportConfig(); //passport의 index.js에서 내보낸 함수 실행

// 라우터 배치
app.use('/api', [challengeRouter, uploadRouter]);

app.use('/api/users', userRouter);
app.use('/api/mypage', mypageRouter);
app.use('/api/proofshot', proofshotRouter);
app.use('/api/character', characterRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.status(200).send('hello world + ci_cd');
});

module.exports = app;
