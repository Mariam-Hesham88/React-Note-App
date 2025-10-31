import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    let [isLoading, setIsLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();
    let { setUserLogin } = useContext(UserContext);


    useEffect(() => { }, []);

    let validationSchema = Yup.object().shape({
        email: Yup.string().email('Write valid Email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin
    });

    function handleLogin(values) {
        setIsLoading(true)
        axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
            .then(({ data }) => {
                setIsLoading(false)
                console.log(data.msg);
                localStorage.setItem('userToken', '3b8ny__' + data.token);
                setUserLogin('3b8ny__' + data.token)
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false)
                setErrorMsg(error.response.data.msg)
                console.log(error);
            })
    }

    return <>

        <section className='flex justify-center pt-10'>
            <div className="w-[70%] ">
                {errorMsg ?
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{errorMsg}</span>
                    </div>
                    : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <h1 className='font-bold text-[28px]'>LogIn</h1>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.errors.email && formik.touched.email ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.email}</span>
                        </div>
                        : null}

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.errors.password && formik.touched.password ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.password}</span>
                        </div>
                        : null}

                    <button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'LogIn'}
                    </button>
                </form>
            </div>
        </section>

    </>
}

