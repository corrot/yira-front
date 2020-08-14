import React, { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/library/button';
import { HeaderStyled } from './header-styled';
import { logoutAction } from '@/store/ducks/user/user.actions';
import { useDispatch } from 'react-redux';

export const Header: FC<IOwnProps> = ({ changeTheme, isAuthenticated }) => {
	const { i18n } = useTranslation();

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAction());
	};

	return (
		<HeaderStyled>
			<span>HEADER</span>
			<div>
				<Button onClick={changeTheme}>DARK MODE</Button>
				<Button active={i18n.language === 'en-US'} onClick={() => i18n.changeLanguage('en-US')}>
					EN
				</Button>
				<Button active={i18n.language === 'ka'} onClick={() => i18n.changeLanguage('ka')}>
					KA
				</Button>
				{isAuthenticated && <Button onClick={handleLogout}>Log out</Button>}
			</div>
		</HeaderStyled>
	);
};

interface IOwnProps {
	changeTheme: () => void;
	isAuthenticated: boolean;
}

export default memo(Header);
