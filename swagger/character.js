/**
 * @swagger
 * /api/character:
 *   get:
 *    summary: "아이템 조회"
 *    description: "전체 아이템을 조회한다. 유저가 가지고 있거나 장착한 아이템에 대한 정보도 표시한다."
 *    tags: [Character]
 *    responses:
 *      "200":
 *        description: 아이템 조회 완료 시
 */

/**
 * @swagger
 * /api/character:
 *   post:
 *    summary: "아이템 구매 및 저장 -(임시 작동 안됨)"
 *    description: "로그인한 유저의 포인트로 아이템을 캐릭터 아이템을 구매 및 저장한다."
 *    tags: [Character]
 *    requestBody:
 *      description: totalPrice,items from body
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              items:
 *                type: array
 *                items:
 *                  type: string
 *              totalPrice:
 *                type: string
 *                description: "전체 구매 비용"
 *    responses:
 *      "200":
 *        description: 아이템 구매 및 저장 완료 시
 */
