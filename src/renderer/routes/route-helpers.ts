import { redirect } from 'react-router-dom';
import { routes, Params, RouteName } from './routes';

const findRoute = (routeName: RouteName) => {
  const route = routes.find((routeData) => routeData.name === routeName);
  if (!route) {
    throw new Error(
      `Route name sent does not match any route. Route was '${routeName}'`,
    );
  }
  return route;
};

export const getRouteFor = (routeName: RouteName, pathParams: Params = {}) => {
  const route = findRoute(routeName);

  // Replace pathParams
  const routePathParams = route.path.split('/');
  const routePathPms = routePathParams.map((pathParam) => {
    if (pathParam.startsWith(':')) {
      const paramName = pathParam.match(/:[^/?]+/gi)?.[0].slice(1);
      if (!paramName) {
        throw new Error(
          `Path parameter '${pathParam}' is not valid for route '${routeName}'`,
        );
      }
      return pathParams[paramName] || '';
    }
    return pathParam;
  });

  const routePath = `/${routePathPms.filter((pathParam) => pathParam !== '').join('/')}`;

  return routePath;
};

export const goToPage = (routeName: RouteName, pathParams: Params = {}) => {
  const routePath = getRouteFor(routeName, pathParams);

  redirect(routePath);
};
