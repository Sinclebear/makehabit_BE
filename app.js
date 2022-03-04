require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./modules/swagger');
const connect = require('./models/index');

// const connect = require('./models'); // database connect
// const cors = require('cors');
const port = 3000;
const app = express();
// const commentsRouter = require('./routes/comment');
const challengeRouter = require('./routes/challenge');
const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage');
connect();

//body 읽기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cors());

// 라우터 배치
app.use('/api', [challengeRouter, userRouter]);

app.use('/api/users', userRouter);
app.use('/api/mypage', mypageRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

app.listen(port, () => {
    console.log('running on port', port);
});
