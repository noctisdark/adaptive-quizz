import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UIProvider from "providers/UIProvider";
import RouterProvider from "providers/RouterProvider/index";
import history from "providers/RouterProvider/history";
import AuthenticationForm from "components/Authentication/AuthenticationForm";
import { authenticated } from "hooks/authentication";

import When from "components/basics/When";

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
            path="/home"
            element={
              <When
                predicate={() => authenticated()}
                then="Home sweet home !"
                otherwise={<Navigate to="/auth" />}
              />
            }
          />
          <Route path="/" element={"Hello world"} />
        </Routes>
      </UIProvider>
    </RouterProvider>
  </React.StrictMode>
);

export default AdaptiveQuiz;
