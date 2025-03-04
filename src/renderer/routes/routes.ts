export type Params = Record<string, string | boolean | number | null>;

export enum RouteName {
  HomePage = 'HomePage',
}

export type Route = {
  name: RouteName;
  path: string;
  exact?: boolean;
  pathParams?: Record<string, string>;
  component?: React.ComponentType;
};

const PATH_PARAM_REGEX = /:[^/?]+/gi;

/**
  Analyzes the path defined for `route` and
  returns a copy of the route with a new attribute
  `pathParams` which is a list of strings that correspond to the path params.

  @param {object} route - Object that represents a route.

  @return {object} updated route with the new attribute.

  @example

    setPathParams({ name: 'product', path: '/product/:id', component: ProductPage })
*/
export const setPathParams = (route: Route): Route => {
  const newRoute = { ...route };
  const { path } = newRoute;
  // Extract the names of the parameters
  const pathMatch = path.match(PATH_PARAM_REGEX) || [];
  const pathParams: Record<string, string> = {};
  pathMatch.forEach((param) => {
    const paramName = param.slice(1);
    pathParams[paramName] = '';
  });
  newRoute.pathParams = pathParams;
  return newRoute;
};

const ROUTES = [
  {
    name: RouteName.HomePage,
    path: '/',
    exact: true,
  },
] as const;

/*
 * This type is used to extract the type of the route params
 * from the path string.
 */
export type RouteParams = {
  [K in RouteName]: Route;
} & Params;

export const routes = ROUTES.map(setPathParams);
