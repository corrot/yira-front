import React, { ComponentClass } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router';
import loadable from '@loadable/component';

export const AsyncPage: any = loadable((props: IAsyncPageProps): any =>
	import(/* webpackPrefetch: true */ `@/pages/${props.page}`)
);

interface IRouteProps {
	component: ComponentClass<any>;
	appProps: any;
	[x: string]: any;
}

export const PrivateRoute = ({ component: PrivateComponent, appProps, ...rest }: IRouteProps) => (
	<Route
		{...rest}
		render={props =>
			appProps.isAuthenticated ? <PrivateComponent {...props} {...appProps} /> : <Redirect to="login" />
		}
	/>
);

export const PublicRoute = ({ component: PublicComponent, appProps, ...rest }: IRouteProps) => (
	<Route
		{...rest}
		render={props => (!appProps.isAuthenticated ? <PublicComponent {...props} {...appProps} /> : <Redirect to="/" />)}
	/>
);

export const routes: IRoute[] = [
	{
		path: '/',
		exact: true,
		component: (props: RouteComponentProps) => <AsyncPage page="home" {...props} />
	}
];

export const router = [{ routes }];

interface IAsyncPageProps {
	page: string;
}

export interface IRoute {
	path?: string;
	exact?: boolean;
	component: any;
}
