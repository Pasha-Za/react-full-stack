const notificationReducer = (state = '', action) => {
    if (action.type === 'SHOW_NOTIFICATION') {
        return action.msg
    }
    return state
}

export const setNotification = (msg, timer) => {
    console.log(msg);
    return async dispatch => {
        const message = await dispatch({
            type: 'SHOW_NOTIFICATION',
            msg
        });
        console.log(message);
        
        message && setTimeout(() => {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                msg: ''
            })
        }, timer);
    }
}

export default notificationReducer;