import React from 'react';
import Layout from '../shared/layout';
import { Formik } from 'formik';
import '../sign-up/sign-up.styles.scss';

const SignIn = () => {
    const initialValues = {
        email: '',
        password: ''
    };

    return (
        <Layout>
            <h1>Sign In</h1>
            <div className="form-container">
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {
                        (values, errors, handleChange, handleSubmit, isSubmitting) => {
                            
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