import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, KeyboardDateTimePicker, Autocomplete, Switches } from 'mui-rff';
import { Checkbox, Button } from '@material-ui/core';
import { renderQuill } from '@/components/library/wysiwig';
import DraggableList from '@/components/library/draggableList';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Flex } from '@/styled/flex';
import { tasksSelector } from '@/store/ducks/tasks';
import { useSelector } from 'react-redux';

interface FormData {
	hello: string;
	city: string;
}

interface IFormProps {
	initialValues?: FormData;
	submitAction: (props: any) => void;
	DateFnsUtils?: dateFns | null;
}

const TaskForm = ({ initialValues, DateFnsUtils = null, submitAction }: IFormProps) => {
	const onSubmit = async (values: FormData) => {
		submitAction(values);
	};

	const validate = async (values: FormData) => {
		if (!values.hello) {
			return { hello: 'Saying hello is nice.' };
		}
		return;
	};

	const users = [
		{ id: 0, userName: 'asd@asd.com' },
		{ id: 1, userName: 'dsa@das.com' }
	];

	return (
		<Form
			onSubmit={onSubmit}
			mutators={{
				...arrayMutators
			}}
			initialValues={initialValues}
			validate={validate}
			render={({
				handleSubmit,
				form: {
					mutators: { push, pop, splice, swap }
				},
				pristine,
				form,
				submitting,
				values
			}) => {
				return (
					<form id="taskForm" onSubmit={handleSubmit} noValidate>
						<TextField label="Title" name="title" required />
						<br />
						<KeyboardDateTimePicker label="Due Date" name="dueDate" required dateFunsUtils={DateFnsUtils} />
						<br />
						<Autocomplete
							label="Assignees"
							name="assignees"
							required
							options={users}
							getOptionValue={option => option.id}
							getOptionLabel={option => option.userName}
							disableCloseOnSelect
							renderOption={(option, { selected }) => (
								<>
									<Checkbox style={{ marginRight: 8 }} checked={selected} />
									{option.userName}
								</>
							)}
							multiple
						/>
						<br />
						<Switches name="isResolved" data={{ label: 'Resolved', value: true }} />
						<Field name="description" component={renderQuill} />
						<br />
						<br />
						Steps to reproduce
						<br />
						<FieldArray name="steps">
							{({ fields }) => (
								<DraggableList
									funcs={{ push, pop, splice, swap }}
									list={fields.map((name, index) => (
										<div key={name}>
											<Flex>
												<TextField label={`Step ${index + 1}`} name={`${name}.stepTitle`} />
												<Button
													variant="contained"
													color="secondary"
													size="small"
													type="button"
													onClick={() => fields.remove(index)}
													style={{ cursor: 'pointer' }}
												>
													remove
												</Button>
											</Flex>
										</div>
									))}
								/>
							)}
						</FieldArray>
						<div>
							<Button
								variant="contained"
								color="primary"
								size="small"
								type="button"
								onClick={() => push('steps', undefined)}
							>
								Add step
							</Button>
						</div>
						{/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
						<Button
							type="button"
							onClick={() => onSubmit(values)}
							variant="contained"
							color="primary"
							size="small"
							disabled={submitting || pristine}
						>
							Submit
						</Button>
					</form>
				);
			}}
		/>
	);
};

export default TaskForm;
