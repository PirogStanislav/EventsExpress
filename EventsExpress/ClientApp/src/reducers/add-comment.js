﻿import initialState from '../store/initialState';

import {
    SET_COMMENT_ERROR, SET_COMMENT_PENDING, SET_COMMENT_SUCCESS
} from '../actions/add-comment';

export const reducer = (state = initialState.add_comment, action) => {

    switch (action.type) {

        case SET_COMMENT_ERROR:
            return {
                ...state,
                commentError: action.payload
            };
        case SET_COMMENT_PENDING:
            return {
                ...state,
                isCommentPending: action.payload
            };
        case SET_COMMENT_SUCCESS:
            return {
                ...state,
                isCommentSuccess: action.payload,
                commentError: null
            };
    }
    return state;
};