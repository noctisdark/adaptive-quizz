import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UIProvider from "providers/UIProvider";
import RouterProvider from "providers/RouterProvider/index";
import history from "providers/RouterProvider/history";

import AuthenticationForm from "components/Authentication/AuthenticationForm";
import Home from "components/Home";
import When from "components/basics/When";

import { authenticated } from "hooks/authentication";
import { ToastContainer } from "providers/ToastProvider";
import AppPresentation from "components/AppPresentation";

const AdaptiveQuiz = () => (
  <React.StrictMode>
    <RouterProvider history={history}>
      <UIProvider>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <When
                predicate={() => !authenticated()}
                then={<AuthenticationForm />}
                otherwise={<Navigate to="/home" />}
              />
            }
          />
          <Route
            path="/home/*"
            element={
              <When
                predicate={() => authenticated()}
                then={<Home />}
                otherwise={<Navigate to="/auth" />}
              />
            }
          />
          <Route path="*" Component={AppPresentation} />
        </Routes>
      </UIProvider>
    </RouterProvider>
    <ToastContainer />
  </React.StrictMode>
);

export default AdaptiveQuiz;
