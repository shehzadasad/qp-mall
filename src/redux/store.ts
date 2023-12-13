import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer, { RootState } from "./rootReducer";
import persistConfig from "./persistConfig";
import { apiErrorMiddleware } from "./apiErrorMiddleware";

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    apiErrorMiddleware,
  ],
});

const persistor = persistStore(store);

export { store, persistor };
