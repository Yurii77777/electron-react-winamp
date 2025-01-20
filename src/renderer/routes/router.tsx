import { createElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { routes } from './routes';
import { RouteComponent } from './route-component';

export const Router = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {routes.map(({ path, name }) => (
        <Route
          key={path}
          path={path}
          element={createElement(RouteComponent[name])}
        />
      ))}
    </Routes>
  );
};
