import { createStore, applyMiddleware } from 'redux'
import reducers from './Reducer'
import ReduxThunk from 'redux-thunk'

export type RootStore = ReturnType<typeof createStore>

const store: RootStore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export type DispatchCB = typeof store.dispatch

export default store;