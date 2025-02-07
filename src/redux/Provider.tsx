"use client";

import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SessionWrapper from "@/components/SessionProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionWrapper>{children}</SessionWrapper>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
