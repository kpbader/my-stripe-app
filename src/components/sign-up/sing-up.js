import React, { useState } from 'react';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import { auth, createUserProfileDocument } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './sign-up.styles.scss';


// validation 
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.firstname) { errors.firstname = 'Required' }
    if (!values.password) { errors.password = 'Required' }
    return errors;
}

const SignUp = () => {
    const initialValues = {
        firstname: '',
        email: '',
        password: ''
    }

    const [error, setError] = useState(null);

    const handleSignUp = async (values, { setSubmitting }) => {
        const { firstname, email, password } = values;

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            // call createUserProfileDocument function 
            await createUserProfileDocument(user, { displayName: firstname });
            nav('/shop');
            setSubmitting(false);
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            setError(err);
        }
    }

    const nav = useNavigate();

    return (
        <Layout>
            <div className="sign-up">
                <h1>Sign Up</h1>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={handleSignUp}
                    >
                        {
                            ({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
                                const { firstname, email, password } = errors;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <input
                                                type="text"
                                                name="firstname"
                                                onChange={handleChange}
                                                value={values.firstname}
                                                placeholder="First Name"
                                                className={'nomad-input ' + (firstname ? 'error' : '')}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                placeholder="Email"
                                                className={'nomad-input ' + (email ? 'error' : '')}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                placeholder="Password"
                                                className={'nomad-input ' + (password ? 'error' : '')}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="button submit"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className="error-message">
                                            {
                                                error && <p>{error.message}</p>
                                            }
                                        </div>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp;