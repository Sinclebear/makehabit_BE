/**
 * @swagger
 * /api/proofshot/{challengeId}/auth:
 *   get:
 *    summary: "인증 페이지 조회"
 *    description: "parameter에 challengeId 담아서 서버로 보낸다."
 *    tags: [ProofShot]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 인증페이지 조회 성공 시
 */

/**
 * @swagger
 * /api/proofshot/{challengeId}/proof:
 *   post:
 *    summary: "인증 페이지 - 인증완료"
 *    description: "parameter에 challengeId 담아서 서버로 보낸다."
 *    tags: [ProofShot]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    requestBody:
 *      description: imgUrl,challengeTitle,comment from body
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              imgUrl:
 *                type: string
 *                description: "이미지 주소"
 *              challengeTitle:
 *                type: string
 *                description: "첼린지 제목"
 *              comment:
 *                type: string
 *                description: "인증 한줄평"
 *    responses:
 *      "200":
 *        description: 인증 업로드 성공 시
 */
