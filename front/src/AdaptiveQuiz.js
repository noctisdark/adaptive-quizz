import React from "react";
import { Routes, Route } from "react-router-dom";

import UIProvider from "providers/UIProvider";
import RouterProvider from "providers/RouterProvider/index";
import history from "providers/RouterProvider/history";
import AuthenticationForm from "components/Authentication/AuthenticationForm";

const AdaptiveQuiz = () => (
  <React.StrictMode>
    <UIProvider>
      <RouterProvider history={history}>
        <Routes>
          <Route path="/auth" Component={AuthenticationForm} />
          <Route path="/" element={"Hello world"} />
        </Routes>
      </RouterProvider>
    </UIProvider>
  </React.StrictMode>
);

export default AdaptiveQuiz;
