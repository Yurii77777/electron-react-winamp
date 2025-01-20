import React from 'react';
import { Link } from 'react-router-dom';
import { getRouteFor } from './route-helpers';
import type { Params, RouteName } from './routes';

type AppLinkProps<R extends RouteName> = {
  children: React.ReactNode;
  className?: string;
  pathParams?: Params;
  routeName: R;
  targetBlank?: boolean;
};

const AppLink = <R extends RouteName>({
  children,
  className = '',
  pathParams = {},
  routeName,
  targetBlank = false,
}: AppLinkProps<R>) => {
  const routePath = getRouteFor(routeName, pathParams);
  let targetBlankProps = {};
  if (targetBlank) {
    targetBlankProps = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <Link className={className} to={routePath} {...targetBlankProps}>
      {children}
    </Link>
  );
};

export { AppLink };
