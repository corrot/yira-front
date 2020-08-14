import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Api from '@/services/api';
import { IAuthProps } from '@/services/api/user';
import { withRouter } from 'react-router';
import { ICommonProps } from '@/types/models/common';
import { Link } from 'react-router-dom';
import { loginAction } from '@/store/ducks/user/user.actions';
import { useDispatch } from 'react-redux';

const Login = ({ history }: ICommonProps) => {
	const initialValues = { email: '', password: '' };

	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = (values: IAuthProps) => {
		const { email, password, repeatPassword } = values;
		const errors = { email: '', password: '' };

		if (!email) {
			errors.email = 'Required';
		} else if (!/\S+@\S+\.\S+/i.test(email)) {
			errors.email = 'Invalid email address';
		}

		if (!password) {
			errors.password = 'Required';
		}

		return !errors.email && !errors.password;
	};

	const dispatch = useDispatch();

	const onSubmit = (values: IAuthProps) => {
		setIsSubmitting(true);
		dispatch(loginAction(values));
		// Api.user
		// 	.authenticateUser(values)
		// 	.then(res => {
		// 		localStorage.setItem('authToken', res.data.token);
		// 		history.push('/');
		// 	})
		// 	.catch(err => console.log(err.message))
		// 	.finally(() => {
		// 		setIsSubmitting(false);
		// 	});
	};

	return (
		<div>
			<h1>Login to Yira</h1>
			<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
				<Form>
					<div>
						<Field type="email" name="email" />
						<ErrorMessage name="email" component="div" />
					</div>
					<div>
						<Field type="password" name="password" />
						<ErrorMessage name="password" component="div" />
					</div>

					<button type="submit" disabled={isSubmitting}>
						Login
					</button>
				</Form>
			</Formik>
			Don't have an account? <Link to="/register">Register</Link>
		</div>
	);
};

export default withRouter(Login);
