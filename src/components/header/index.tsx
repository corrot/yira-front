import React, { memo, FC } from 'react';

import Button from '@/components/library/button';
import { HeaderStyled } from './header-styled';
import { logoutAction } from '@/store/ducks/user/user.actions';
import { useDispatch } from 'react-redux';

export const Header: FC<IOwnProps> = ({ isAuthenticated }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAction());
	};

	return (
		<HeaderStyled>
			<h2>Yira service desk</h2>
			<div>{isAuthenticated && <Button onClick={handleLogout}>Log out</Button>}</div>
		</HeaderStyled>
	);
};

interface IOwnProps {
	changeTheme: () => void;
	isAuthenticated: boolean;
}

export default memo(Header);
