import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const TableComponent = ({ data, headers }) => {
	const classes = useStyles();

	const tasks = data?.map(({
		id,
		title,
		dueDate,
		createDate,
		isResolved,
		description,
		steps
	}) => ({
		id,
		title,
		dueDate: dueDate?.toString(),
		createDate
		isResolved,
		description,
		steps: steps?.map(<div>{JSON.stringify(step)}</div>)
	}))

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map(o => (
							<TableCell align="right" key={o.selector}>
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
