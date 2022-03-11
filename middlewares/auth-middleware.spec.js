const authMiddleware = require('./auth-middleware');
jest.mock('../models');

const User = require('../models/user');
test('정상적인 토큰을 넣은경우 findOne 실행된다', () => {
    User.findOne = jest.fn();
    authMiddleware(
        {
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.MRvO3fE0o9C-pZfd3pI0hMDDXihJfQa1XPQ-UAelzaI',
                //authorization: '',
            },
        },
        {
            status: () => ({
                json: () => {},
                send: () => {},
            }),
            locals: {},
        }
    );

    expect(User.findOne).toHaveBeenCalledTimes(1);
});

test('변조된 토큰으로 접근시 로그인 후 사용하세요 메시지', () => {
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
        errorMessage: '로그인 후 사용하시오',
        user: null,
    });
});

test('페이로드까지 정상인 토큰을 넣은경우 실행', () => {
    User.findOne = jest.fn();

    authMiddleware(
        {
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZ2cwMTU3OCIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.WuEhNhScvSFM01018apwUAAFG-7J1slM8uH4kND9G7Y',
            },
        },
        {
            status: () => ({
                json: () => {},
                send: () => {},
            }),
            locals: {},
        }
    );

    //toHaveBeenCalled는 몇번 실행됐는지 감시해줌
    //expect(jest.fn()).toHaveBeenCalledTimes(1) 이건 에러남
    //한번도 실행된 적 없다며서..

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ userId: 'bgg01578' });
});
