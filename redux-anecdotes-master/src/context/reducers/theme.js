export const themeReducer = (state, { type, payload }) => {
    switch (type) {
        case 'setTheme':
            return {
                ...state,
                theme: payload
            };

        default:
            return state;
    }
};