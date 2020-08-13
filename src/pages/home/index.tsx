import React from 'react';
import { useTranslation } from 'react-i18next';

import Api from '@/services/api';
import { Flex } from '@/styled/flex';
import useApi from '@/hooks/useApi';

export const Home = () => {
	const { t } = useTranslation();
	const [users] = useApi(Api.user.getUsers);

	const handleLogin = () => {
		try {
			const data = Api.user.authenticateUser();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRegistration = () => {
		try {
			const data = Api.user.registerUser();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Flex center>
				<Flex center sm={6} xs={8} padding="1rem">
					<span>{t('Main page')}</span>
				</Flex>
				<Flex direction="column" center sm={6} xs={8} padding="1rem">
					{users.map(u => (
						<div key={u.id}>{u.username}</div>
					))}
				</Flex>
			</Flex>
			<button type="button" onClick={handleLogin}>
				login
			</button>
			<button type="button" onClick={handleRegistration}>
				register
			</button>
		</>
	);
};

export default Home;
