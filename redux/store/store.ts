import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import { rootReducer } from '../reducers/rootReducer'


const persistConfig = {
    key: 'persist',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)