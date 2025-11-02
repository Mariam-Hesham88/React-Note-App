import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Modal } from "flowbite-react";
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function Note({ noteData, getUserNotes }) {
    let { title, content, _id } = noteData;
    let [modal, setModal] = useState(false);

    function deleteNote(id) {
        axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            {
                headers: { token: localStorage.getItem('userToken') }
            }
        )
            .then((res) => {
                console.log(res);
                getUserNotes();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteNoteAlert(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "bg-green-400 rounded-md text-white border-0 ms-2 p-2",
                cancelButton: "bg-red-400 rounded-md text-white border-0 ms-2 p-2"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote(id);
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    icon: "error"
                });
            }
        });
    }

    function handleUpdateNote(values) {
        axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${_id}`, values,
            {
                headers: { token: localStorage.getItem('userToken') }
            }
        )
            .then((res) => {
                console.log(res);
                setModal(false);
                getUserNotes();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let validationSchema = Yup.object().shape({
        title: Yup.string().min(3, 'The title must be more than 3 chars').max(25, 'The title can not be more than 25 chars').required('Title is required'),
        content: Yup.string().min(3, 'The content must be more than 3 chars').max(250, 'The content can not be more than 25 chars').required('Content is required'),
    });

    let formik = useFormik({
        initialValues: {
            title: title,
            content: content,
        },
        validationSchema,
        onSubmit: handleUpdateNote
    });

    return <>

        <div key={_id} className="w-full md:w-1/2 lg:w-1/4 p-3 ">
            <div className='shadow-md p-6 rounded-md'>
                <h3 className='text-blue-500 text-3xl capitalize font-semibold pb-1'>{title}</h3>
                <p className=' uppercase'>{content}</p>
                <div className="flex mt-4 ms-auto w-fit">
                    <button onClick={() => setModal(true)} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => { deleteNoteAlert(_id) }} type="button" className="focus:outline-none text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
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
                                Update Your Note
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
                            <button type="submit" className="text-white inline-flex items-center bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Update note
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
