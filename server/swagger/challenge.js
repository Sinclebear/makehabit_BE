/**
 * @swagger
 * /api/main/recommendation:
 *   get:
 *    summary: "첼린지 추천"
 *    description: "첼린지를 추천한다. length를 입력하지 않으면 랜덤으로 4개를 추천한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: length
 *        in: query
 *        description: length from query string
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 첼린지 추천 완료 시
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *    summary: "첼린지 검색"
 *    description: "Title에 검색 키워드를 가진 첼린지를 조회한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: title
 *        in: query
 *        description: title from query string
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 아이템 조회 완료 시
 */

/**
 * @swagger
 * /api/category/{categoryId}:
 *   get:
 *    summary: "카테고리 페이지 목록조회"
 *    description: "인수로 넘겨받은 카테코리 아이디(new ,popular, ...)에 해당하는 첼린지들을 반환한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: length
 *        in: query
 *        description: length from query string
 *        schema:
 *          type: number
 *      - name: categoryId
 *        in: path
 *        required: true
 *        description: categoryId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 카테고리 페이지 목록 조회 완료 시
 */

/**
 * @swagger
 * /api/challenges/{challengeId}:
 *   get:
 *    summary: "첼린지 상세조회"
 *    description: "파라미터로 받은 첼린지 ID에 대한 상세 정보를 반환한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 첼린지 상세조회 완료 시
 */

/**
 * @swagger
 * /api/challenges:
 *   post:
 *    summary: "첼린지 작성"
 *    description: "넘겨받은 첼린지 정보를 DB에 생성한다."
 *    tags: [Challenge]
 *    requestBody:
 *      description: challenge write info from body
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "첼린지 제목"
 *              content:
 *                type: string
 *                description: "첼린지 내용"
 *              category:
 *                type: string
 *                description: "첼린지 카테고리"
 *              thumbnail:
 *                type: string
 *                description: "썸네일 주소"
 *              startAt:
 *                type: date
 *                description: "첼린지 시작일"
 *              howtoContent:
 *                type: string
 *                description: "첼린지 인증 방법"
 *    responses:
 *      "200":
 *        description: 첼린지 작성 성공 시
 */

/**
 * @swagger
 * /api/challenges/{challengeId}/join:
 *   post:
 *    summary: "첼린지 참여하기"
 *    description: "유저의 participate와 챌린지의 participants에 각각 서로의 id를 삽입한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 첼린지 참여 완료 시
 */

/**
 * @swagger
 * /api/challenges/{challengeId}/join:
 *   delete:
 *    summary: "첼린지 참여취소"
 *    description: "유저의 participate와 챌린지의 participants에서 각각 서로의 id를 제거한다"
 *    tags: [Challenge]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 첼린지 참여 취소 완료 시
 */

/**
 * @swagger
 * /api/challenges/{challengeId}/like:
 *   post:
 *    summary: "찜하기"
 *    description: "User의 likes 에 해당 첼린지 id를 삽입한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 찜하기 완료 시
 */

/**
 * @swagger
 * /api/challenges/{challengeId}/like:
 *   delete:
 *    summary: "찜하기 취소"
 *    description: "User의 likes 에서 해당 첼린지 id를 제거한다."
 *    tags: [Challenge]
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        required: true
 *        description: challengeId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 찜하기 취소 완료 시
 */
