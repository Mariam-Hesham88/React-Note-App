import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {
    let [isLoading, setIsLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();
    useEffect(() => { }, []);

    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name should be more than 2 char').max(50, 'Write valid Name').required('Name is required'),
        email: Yup.string().email('Write valid Email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phone: Yup.string().required('Phone is required'),
        age: Yup.string().required('Age is required'),
    });

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            age: '',
        },
        validationSchema,
        onSubmit: handleRegister
    });

    function handleRegister(values) {
        setIsLoading(true)
        axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
            .then(({ data }) => {
                setIsLoading(false)
                console.log(data.msg);
                navigate('/login')
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
                        <h1 className='font-bold text-[28px]'>Register</h1>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.errors.name && formik.touched.name ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.name}</span>
                        </div>
                        : null}

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

                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.errors.phone && formik.touched.phone ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.phone}</span>
                        </div>
                        : null}

                    <div className="mb-6">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.errors.age && formik.touched.age ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.age}</span>
                        </div>
                        : null}

                    <button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Register'}
                    </button>
                </form>
            </div>
        </section>

    </>
}
