import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@/components/library/modal';
import TaskForm from '@/pages/home/components/TaskForm';
import { ITask } from '@/store/ducks/tasks/tasks.types';
import { useDispatch } from 'react-redux';
import { tasksAction } from '@/store/ducks/tasks';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const TableComponent = ({ data, headers }) => {
	const dispatch = useDispatch();

	const updateTask = props => {
		dispatch(tasksAction.updateTaskAction(props));
	};

	const tasks = data?.map(({ id, title, dueDate, createDate, isResolved, description, steps }) => ({
		id,
		title,
		dueDate: dueDate?.toString(),
		createDate,
		isResolved: isResolved ? (
			<div style={{ color: 'green' }}>Resolved</div>
		) : (
			<div style={{ color: 'red' }}>Not Resolved</div>
		),
		description,
		steps: steps?.map(<div>{JSON.stringify(step)}</div>),
		edit: (
			<Modal
				buttonText="Edit"
				modalTitle={`Edit ${title}`}
				modalBody={<TaskForm submitAction={updateTask} initialValues={data.find((o: ITask) => o.id === id)} />}
			/>
		)
	}));

	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map(o => (
							<TableCell align="left" key={o.selector}>
								{o.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tasks.map(row => (
						<TableRow key={row.id}>
							{headers.map(header => (
								<TableCell component="th" scope="row" key={row[header.selector]}>
									{row[header.selector]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComponent;
