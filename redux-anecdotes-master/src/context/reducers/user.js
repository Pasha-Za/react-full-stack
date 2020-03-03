export const userReducer = (state, { type, payload }) => {
    switch (type) {
        case 'setToken':
            return {
                ...state,
                token: payload
            };

        case 'setUser':
            return {
                ...state,
                user: payload
            };

        default:
            return state;
    }
};