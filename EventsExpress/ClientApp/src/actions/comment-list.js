﻿
import EventsExpressService from '../services/EventsExpressService';


export const SET_COMMENTS_PENDING = "SET_COMMENTS_PENDING";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const SET_COMMENTS_ERROR = "SET_COMMENTS_ERROR";


const api_serv = new EventsExpressService();

export default function get_comments(value) {

    return dispatch => {
        dispatch(setCommentPending(true));

        const res = api_serv.getAllComments(value);
        res.then(response => {
            if (response.error == null) {
                dispatch(getComments(response));

            } else {
                dispatch(setCommentError(response.error));
            }
        });
    }
}

function setCommentPending(data) {
    return {
        type: SET_COMMENTS_PENDING,
        payload: data
    }
}

function getComments(data) {
    return {
        type: GET_COMMENTS_SUCCESS,
        payload: data
    }
}

function setCommentError(data) {
    return {
        type: SET_COMMENTS_ERROR,
        payload: data
    }
}