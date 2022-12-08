import React from 'react';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import './sign-up.styles.scss';

const SignUp = () => {
    const initialValues = {
        firstname: '',
        email: '',
        password: ''
    }

    return (
        <Layout>
            <div className="sign-up">
                <h1>Sign Up</h1>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
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
                                                className={'nomad-input ' + ( firstname ? 'error' : '') }
                                            />
                                        </div>
                                        <div>
                                            <input 
                                                type="text"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                placeholder="Email"
                                                className={'nomad-input ' + ( email ? 'error' : '') }
                                            />
                                        </div>
                                        <div>
                                            <input 
                                                type="text"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                placeholder="Password"
                                                className={'nomad-input ' + ( password ? 'error' : '') }
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