import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.sass";
import Layout from "./components/Layout";

import routes from "./pages/routes";
import httpInterceptor from "./interceptors/httpInterceptor";

function App() {
  httpInterceptor();
  return (
    <Router>
      <div>
        <Routes>
          {routes.map(({ component: Component, path, id, ...rest }) => {
            return (
              <Route
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Layout component={Component} hideMenu={rest.hideMenu} />
                  </React.Suspense>
                }
                path={path}
                key={id}
                {...rest}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
