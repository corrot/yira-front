import React from 'react';
import { useTranslation } from 'react-i18next';

import Api from '@/services/api';
import { Flex } from '@/styled/flex';
import useApi from '@/hooks/useApi';

export const Home = () => {
	const { t } = useTranslation();
	const [tasks] = useApi(Api.tasks.getTasks);

	const newTask = {
		id: 1,
		title: 'Task 1',
		dueDate: 'today',
		createDate: 'yesterday',
		isResolved: false,
		description: "<div style='font-weight: bold'>This is a sample description</div>"
	};
	const editedTask = {
		id: 1,
		title: 'Task 1 edited',
		dueDate: 'tomorrow',
		createDate: 'today',
		isResolved: false,
		description: "<div style='font-weight: bold'>This is a sample description</div>"
	};

	const createTask = props => {
		return useApi(Api.tasks.createTask(props));
	};
	const updateTask = props => {
		return useApi(Api.tasks.updateTask(props));
	};
	const deleteTask = props => {
		return useApi(Api.tasks.deleteTask(props));
	};

	return (
		<>
			<Flex center>
				<Flex center sm={6} xs={8} padding="1rem">
					<span>{t('Main page')}</span>
				</Flex>
				<Flex direction="column" center sm={6} xs={8} padding="1rem">
					{tasks.map(t => (
						<div key={t.id}>{t.title}</div>
					))}
				</Flex>
				<button type="button" onClick={() => createTask(newTask)}>
					create task
				</button>
				<button type="button" onClick={() => updateTask(editedTask)}>
					edit task
				</button>
				<button type="button" onClick={() => deleteTask(newTask)}>
					delete task
				</button>
			</Flex>
		</>
	);
};

export default Home;
