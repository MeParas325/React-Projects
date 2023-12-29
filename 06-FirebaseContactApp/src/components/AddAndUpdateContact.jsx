import React from 'react'
import Modal from './Modal'
import { Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/fireabase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, username, useremail, userContactId }) => {

    const addContact = async (contact) => {

        try {

            onClose();
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            toast.success("Contact added successfully.");


        } catch (error) {
            console.log(error);
        }

    }

    const updateContact = async (contact) => {

        try {
            onClose();
            const contactRef = doc(db, "contacts", userContactId);
            await updateDoc(contactRef, contact)
            toast.success("Contact updated successfully");

        } catch (error) {

        }
    }

    function validateEmail(value) {
        let error;
        if (!value) {
            error = 'Email is required*';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }

    function validateUsername(value) {
        let error;
        if (!value || value.trim() === "") {
            error = 'Name is required*';
        }
        return error;
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik initialValues={{
                    name: isUpdate ? username : "",
                    email: isUpdate ? useremail : "",
                }} onSubmit={(values) => {
                    console.log(values)
                    isUpdate ? updateContact(values) :
                        addContact(values)
                }} >
                    {({ errors, touched, validateField, validateForm }) => (
                        <Form className='font-bold gap-4 flex flex-col'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='name' >Name</label>
                                <Field validate={validateUsername} className="px-2 border h-10" name="name"></Field>
                                {errors.name && touched.name && <div className='text-red-800 text-sm font-semibold'>{errors.name}</div>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email'>Email</label>
                                <Field validate={validateEmail} type="email" className="px-2 border h-10" name="email"></Field>
                                {errors.email && touched.email && <div className="text-red-800 text-sm font-semibold">{errors.email}</div>}
                            </div>
                            <button type='submit' className='border self-end bg-orange px-3 py-1.5'>{isUpdate ? "Update Contact" : "Add Contact"}</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    )
}

export default AddAndUpdateContact