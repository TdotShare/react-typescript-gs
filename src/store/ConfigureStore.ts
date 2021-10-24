import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer  from "./reducer/User" 
import breadcrumbsReducer  from "./reducer/Breadcrumbs" 
import titleHeaderReducer  from "./reducer/TitleHeader" 

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: []
}

const rootReducer = combineReducers({
  user: userReducer,
  breadcrumbs : breadcrumbsReducer,
  titleheader : titleHeaderReducer
})

const counter_persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: counter_persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch