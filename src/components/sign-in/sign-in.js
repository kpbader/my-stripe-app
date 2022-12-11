import React, { useState } from 'react';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/index';
import '../sign-up/sign-up.styles.scss';

// validation  
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    } return errors;
}

const SignIn = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setSubmitting(false);
            navigate('/shop');
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            setError(error);
        }
    }

    return (
        <Layout>
            <h1>Sign In</h1>
            <div className="form-container">
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}>
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => {
                            // const { email } = errors; 
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="Email"
                                            value={values.email}
                                            className='nomad-input'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            placeholder="Password"
                                            value={values.password}
                                            className='nomad-input'
                                        />
                                    </div>
                                    <div className="submit-btn">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="button submit"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="error-message">
                                        {
                                            error && <p>{error.message}</p>
                                        }
                                    </div>
                                </form>
                            );
                        }
                    }

                </Formik>
            </div>
        </Layout>
    )
}

export default SignIn;