import React, { useCallback, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { themes } from '@/styled/themes';
import { GlobalStyle } from '@/styled/global';
import Header from '@/components/header';
import Container from '@/components/library/container';
import ToastContainer from '@/components/toast';
import useActions from '@/hooks/useActions';
import { appSelectors, appActions } from '@/store/ducks/app';

import { routes, AsyncPage, IRoute } from './routes';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { userSelector } from '@/store/ducks/user';

const App = () => {
	const theme = useSelector(appSelectors.theme);
	const themeSwitch = useActions(appActions.themeSwitchAction);
	const activeTheme: DefaultTheme = themes[theme];

	const changeTheme = useCallback(() => {
		const themeToSwitch = theme === 'light' ? 'dark' : 'light';
		themeSwitch(themeToSwitch);
	}, [theme, themeSwitch]);

	const isAuthenticated = useSelector(userSelector.isUserLoggenIn);

	return (
		<ThemeProvider theme={activeTheme}>
			<>
				<ToastContainer />
				<GlobalStyle />
				<Container>
					<Header changeTheme={changeTheme} isAuthenticated={isAuthenticated} />
					<Switch>
						{isAuthenticated ? <Redirect to="/" /> : <Route path="/login" component={Login} />}
						{isAuthenticated ? <Redirect to="/" /> : <Route path="/register" component={Register} />}
						{routes.map((r: IRoute) =>
							!isAuthenticated ? (
								<Redirect to="/login" />
							) : (
								<Route key={r.path} path={r.path} exact={r.exact} component={r.component} />
							)
						)}
						<Route component={() => <AsyncPage page="not-found" />} />
					</Switch>
				</Container>
			</>
		</ThemeProvider>
	);
};

export default hot(App);
