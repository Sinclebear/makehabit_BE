const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /main:
 *   get:
 *     description: 카테고리 페이지 - 목록 조회
 *     tags: [Main]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "categoryId"
 *       in: "param"
 *       description: "조회할 카테고리 id ex) api/main/exercise"
 *       type: "string"
 *     - name: "length"
 *       in: "query"
 *       description: "카드 갯수"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful response"
 *           content:
 *             application/json:
 *               schema:
  *                 type: array
  *                 challenges:
 *
 *
 *
 *
 *
 *
 */

router.get("/main/:categoryId", async (req, res) => {});

module.exports = router;
