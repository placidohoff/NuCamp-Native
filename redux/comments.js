import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload };

        case ActionTypes.ADD_COMMENT:
            const id = state.comments.length
            // console.log(action.payload)
            const newComment = { ...action.payload, id: id }
            // const newComments =  [...state.comments, newComment] 
            // alert('I AM AT THE REDUCER')
            // alert(`${newComment}`)
            // console.log(newComments)
            // return state
            return { ...state, comments: [...state.comments, newComment] }
        default:
            return state;
    }
};