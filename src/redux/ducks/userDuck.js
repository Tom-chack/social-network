// Action Types
const USER_LOGIN = 'user/USER_LOGIN';
const USER_ERROR = 'user/USER_ERROR';

// Actions
export const userLogin = (payload) => ({type: USER_LOGIN, payload});
export const userError = (payload) => ({type: USER_ERROR, payload});

// Initial State of the userDuck
const currentuser = JSON.parse( localStorage.getItem('_user') );

const initialState = {
    user: { username: '', email: '', password: '' },
    loggedIn: currentuser.id ? true : false,
    users: [],
    errors: []
}

// userDuck Reducer
const userDuck = ( state = initialState, {type, payload}) => { 
    
    switch(type) {

        case USER_LOGIN: 
            return {
                ...state,
                error:[],
                user: payload,
                loggedIn: true
            }
        case ERROR: 
            return {
                ...state,
                error: [...error, payload]
            }
        default:
            return state;
    }

}

export default userDuck;