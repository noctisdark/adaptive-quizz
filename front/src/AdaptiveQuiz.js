import React from "react";

import UIProvider from "providers/UIProvider";
import RouteProvider from "providers/RouterProvider/index";

const AdaptiveQuiz = () => (
  <React.StrictMode>
    <RouteProvider>
      <UIProvider>Hello world</UIProvider>
    </RouteProvider>
  </React.StrictMode>
);

export default AdaptiveQuiz;
