require("dotenv").config();
const express = require("express");
const { swaggerUi, specs } = require("./modules/swagger");

// const connect = require('./models'); // database connect
// const cors = require('cors');
const port = 3000;
const app = express();
// const commentsRouter = require('./routes/comment');
// const postRouter = require('./routes/post');
const userRouter = require("./routes/user");
// connect();

//body 읽기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cors());

// 라우터 배치
// app.use(
//     '/api',
//     [postRouter, commentsRouter, userRouter]
// );

app.use("/api", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", async (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log("running on port", port);
});
