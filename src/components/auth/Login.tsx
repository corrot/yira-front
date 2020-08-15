import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { loginAction } from '@/store/ducks/user/user.actions';
import { useDispatch } from 'react-redux';
import { IAuthProps } from '@/store/ducks/user/user.types';

const Login = () => {
	const initialValues = { email: '', password: '' };

	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = (values: IAuthProps) => {
		const { email, password } = values;
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
	};

	return (
		<div>
			<h1>Login to Yira</h1>
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

					<button type="submit" disabled={isSubmitting}>
						Login
					</button>
				</Form>
			</Formik>
			Don't have an account? <Link to="/register">Register</Link>
		</div>
	);
};

export default Login;
