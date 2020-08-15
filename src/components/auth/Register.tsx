import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Api from '@/services/api';
import { withRouter } from 'react-router';
import { ICommonProps } from '@/types/models/common';
import { Link } from 'react-router-dom';
import { IRegisterProps } from '@/store/ducks/user/user.types';

const Register = ({ history }: ICommonProps) => {
	const initialValues = { email: '', password: '', repeatPassword: '' };

	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = (values: IRegisterProps) => {
		const { email, password, repeatPassword } = values;
		const errors = { email: '', password: '', repeatPassword: '' };

		if (!email) {
			errors.email = 'Required';
		} else if (!/\S+@\S+\.\S+/i.test(email)) {
			errors.email = 'Invalid email address';
		}

		if (!password) {
			errors.password = 'Required';
		} else if (!/^[A-Za-z]w{7,15}$/.test(password)) {
			// TODO: errors.password = 'Password must be 8-16 characters, must start with letter and contain at least one number';
		}

		if (!repeatPassword || (repeatPassword && repeatPassword !== password)) {
			errors.repeatPassword = 'Passwords do not match';
		}

		return !errors.email && !errors.password && !errors.repeatPassword;
	};

	const onSubmit = (values: IRegisterProps) => {
		setIsSubmitting(true);
		Api.user
			.registerUser(values)
			.then(() => history.push('/login'))
			.catch(err => console.log(err.message))
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<div>
			<h1>Register to Yira</h1>
			<Formik initialValues={initialValues} validate={() => validate} onSubmit={onSubmit}>
				<Form>
					<div>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
					</div>
					<div>
						<Field type="password" name="password" />
						<ErrorMessage name="password" component="div" />
					</div>
					<div>
						<Field type="password" name="repeatPassword" />
						<ErrorMessage name="repeatPassword" component="div" />
					</div>

					<button type="submit" disabled={isSubmitting}>
						Register
					</button>
				</Form>
			</Formik>
			Already have an account? <Link to="/login">Login</Link>
		</div>
	);
};

export default withRouter(Register);
