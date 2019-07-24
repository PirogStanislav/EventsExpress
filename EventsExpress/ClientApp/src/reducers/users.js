import initialState from '../store/initialState';
import {
    GET_USERS_ERROR, GET_USERS_PENDING, GET_USERS_SUCCESS
} from '../actions/users';

export const reducer = (state, action) => {
    state = state || initialState.users;
    switch(action.type)
        {
            case GET_USERS_SUCCESS:
                return{
                    ...state,
                    isPending: false,
                    data: action.payload
                }
            case GET_USERS_PENDING:
                return{
                    ...state,
                    isPending: action.payload
                }

            case GET_USERS_ERROR:
                return {
                    ...state,
                    isError: action.payload,
                    isPending: false
                }
        }
    return state;
}