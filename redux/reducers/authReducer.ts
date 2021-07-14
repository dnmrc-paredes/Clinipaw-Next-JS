import { AnyAction } from "redux";

export const authReducer = (state = false, action: AnyAction) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return state = true
        case 'LOGGED_OUT':
            return state = false
        default:
            return state
    }
}