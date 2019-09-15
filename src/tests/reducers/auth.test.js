import authReducer from '../../reducers/auth';


test('Should test the default state', () => {
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});


test('Should set uid for login', () => {
    const uid = 'lkasjdfljasdlfjlkadsjf';
    const action = {
        type: 'LOGIN',
        uid
    };    
    const state = authReducer(undefined, action);
    expect(state).toEqual({uid});
});


test('Should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer(undefined, action);
    expect(state).toEqual({});
});