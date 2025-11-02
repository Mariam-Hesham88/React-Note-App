import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Note from '../Note/Note';
import { Modal } from "flowbite-react";
import { useFormik } from 'formik';
import * as Yup from 'yup'


export default function Home() {
    let [notes, setNotes] = useState([]);
    let [modal, setModal] = useState(false);

    function getUserNotes() {
        axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,
            {
                headers: { token: localStorage.getItem('userToken') }
            }
        )
            .then(({ data }) => {
                console.log(data.notes);
                setNotes(data.notes);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUserNotes();
    }, []);

    function clearModal(){
        setModal(true);
        formik.resetForm();
    }

    let validationSchema = Yup.object().shape({
        title: Yup.string().min(3, 'The title must be more than 3 chars').max(25, 'The title can not be more than 25 chars').required('Title is required'),
        content: Yup.string().min(3, 'The content must be more than 3 chars').max(250, 'The content can not be more than 25 chars').required('Content is required'),
    });

    function handleAddNote(values) {
        axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, { headers: { token: localStorage.getItem('userToken') } })
            .then(({ data }) => {
                console.log(data.note);
                getUserNotes();
                setModal(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema,
        onSubmit: handleAddNote
    });


    return <>
        <section className='flex w-full flex-wrap justify-start '>
            {notes.length !== 0 ? (notes.map((note) => <Note key={note._id} noteData={note} getUserNotes={getUserNotes} />))
                :
                (<div className="notes w-1/5 bg-gray-50 rounded-2xl shadow text-center p-5">
                    <p className='text-blue-600'>No Note Available yet!!</p>
                </div>)
            }
        </section>


        <div onClick={() => setModal(true)} className='fixed bottom-10 right-10 w-14 h-14 bg-blue-700 text-white rounded-full hover:scale-110 transition-all flex justify-center items-center'>
            <i className="fa-solid fa-plus text-xl"></i>
        </div>


        {modal ?
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-[9999] flex justify-center items-center bg-gray-800/60"
            >

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Note
                            </h3>
                            <button onClick={() => setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <i className="fa-solid fa-xmark"></i>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
                                    <input type="text" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                                {formik.errors.title && formik.touched.title ?
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span className="font-medium">{formik.errors.title}</span>
                                    </div>
                                    : null}

                                <div className="col-span-2">
                                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content:</label>
                                    <textarea id="content" value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your note content here" defaultValue={""} />
                                </div>
                                {formik.errors.content && formik.touched.content ?
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span className="font-medium">{formik.errors.content}</span>
                                    </div>
                                    : null}

                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add note
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            :
            null
        }


    </>
}
