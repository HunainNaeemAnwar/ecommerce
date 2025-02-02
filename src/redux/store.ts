// store.ts
import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopCo"; // Ensure this path is correct
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

// Custom function to handle storage in Next.js
export function createPersistStore(): WebStorage {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createPersistStore();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, shopReducer);

export const store = configureStore({
  reducer: {
    shop: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// **Add these exports to define RootState and AppDispatch types**
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
