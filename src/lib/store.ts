import { configureStore } from "@reduxjs/toolkit";
import { satellitePositionsApi } from "@/services/api";
import satelliteReducer from './satelliteSlice'

export const store = configureStore({
    reducer: {
        [satellitePositionsApi.reducerPath]: satellitePositionsApi.reducer,
        satellite: satelliteReducer
    },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(satellitePositionsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;