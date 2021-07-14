import { AnyAction, combineReducers } from 'redux'
import { Istate } from '../../ts/state'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers<Istate, AnyAction>({
    auth: authReducer,
})