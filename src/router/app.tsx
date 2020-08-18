import React, { useCallback } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { themes } from '@/styled/themes';
import { GlobalStyle } from '@/styled/global';
import Header from '@/components/header';
import Container from '@/components/library/container';
import ToastContainer from '@/components/toast';
import useActions from '@/hooks/useActions';
import { appSelectors, appActions } from '@/store/ducks/app';

import { routes, AsyncPage, IRoute, PublicRoute, PrivateRoute } from './routes';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { userSelector } from '@/store/ducks/user';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const App = () => {
	const theme = useSelector(appSelectors.theme);
	const themeSwitch = useActions(appActions.themeSwitchAction);
	const activeTheme: DefaultTheme = themes[theme];

	const changeTheme = useCallback(() => {
		const themeToSwitch = theme === 'light' ? 'dark' : 'light';
		themeSwitch(themeToSwitch);
	}, [theme, themeSwitch]);

	const isAuthenticated = useSelector(userSelector.isAuthenticated);

	return (
		<ThemeProvider theme={activeTheme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<>
					<ToastContainer />
					<GlobalStyle />
					<Container>
						<Header changeTheme={changeTheme} isAuthenticated={isAuthenticated} />
						<Switch>
							<PublicRoute path="/login" component={Login} appProps={{ isAuthenticated }} />
							<PublicRoute path="/register" component={Register} appProps={{ isAuthenticated }} />
							{routes.map((r: IRoute) => (
								<PrivateRoute
									key={r.path}
									path={r.path}
									exact={r.exact}
									component={r.component}
									appProps={{ isAuthenticated }}
								/>
							))}
							<Route component={() => <AsyncPage page="not-found" />} />
						</Switch>
					</Container>
				</>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	);
};

export default hot(App);
