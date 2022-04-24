require('dotenv').config();
const authMiddleware = require('../middlewares/auth-middleware');

const User = require('../models/user');
test('정상적인 토큰을 넣은경우 토큰에 들어있는 email 로 findOne 실행한다.', () => {
    User.findOne = jest.fn(({}) => {
        return {
            exec: () => {
                return {
                    then: (callback) => {
                        callback(3);
                    },
                };
            },
        };
    });

    authMiddleware(
        {
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJnZzAxNTc4QG5hdmVyLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.zinhIAbmDrc6Z_6eiJhUvcD_IGxuyQ0ZCub_ELqZfEw',
            },
        },
        {
            status: () => ({
                json: () => {},
                send: () => {},
            }),
            locals: {},
        },
        () => {}
    );

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({
        email: 'bgg01578@naver.com',
    });
});

test('변조된 토큰으로 접근시 로그인 후 사용하세요 메시지를 반환한다.', () => {
    const mockedSend = jest.fn();

    authMiddleware(
        {
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.EpM5XBzTJZ4J8AfoJEcJrjth8pfH28LWdjLo90sYb9g',
            },
        },
        {
            status: () => ({
                json: () => {},
                send: mockedSend,
            }),
            locals: {},
        }
    );
    expect(mockedSend).toHaveBeenCalledWith({
        message: '로그인 후 사용하시오',
        user: null,
    });
});
