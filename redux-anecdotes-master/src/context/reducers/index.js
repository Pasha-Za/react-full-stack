import { userReducer } from './user';
import { themeReducer } from './theme';

export const initialState = {
    theme: {
        theme: 'white',
    },
    user: {
        token: null,
        account: null
    }
}

export const mainReducer = ({theme, user}, action) => ({
  user: userReducer(user, action),
  theme: themeReducer(theme, action)
});