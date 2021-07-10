import {NextPage} from 'next'
import Head from 'next/head'
import {useState, ChangeEvent, FormEvent} from 'react'
import axios from 'axios'

// Styles 
import styles from './setappointment.module.scss'
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ToastContainer, toast } from 'react-toastify'

const SetAppointment: NextPage = () => {

    // Toasts
    const successToast = () => toast('Appointment Created.', {type: 'success'})
    const errorToast = () => toast('Please fill all inputs.', {type: 'warning'})

    const [formDetails, setFormDetails] = useState<{name: string, email: string, phone: string, date: string, kind: string, msg: string}>({
        name: "",
        email: "",
        phone: "",
        date: "",
        kind: "",
        msg: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setFormDetails({
            ...formDetails,
            [name]: value
        })
    }

    const submitAppointment = async (e: FormEvent) => {
        e.preventDefault()
        const {name, email, phone, date, kind, msg} = formDetails

        if (!name || !email || !phone || !date || !kind || !msg) {
            return errorToast()
        }
        
        const {data} = await axios.post<{status: string, msg: string}>('/api/setappointment', formDetails)
        
        if (data.status === "ok") {
            setFormDetails({
                name: "",
                email: "",
                date: "",
                phone: "",
                kind: "",
                msg: ""
            })
            successToast()
        }
    }

    return (
        <div className={styles.container}>

            <Head>
                <title> CliniPaw | Set Appointment </title>
            </Head>

            <form method="post">
                <div className={styles.form}>
                    <div className={styles.persondetails}>
                        <label htmlFor="name"> Name </label>
                        <input type="text" onChange={handleChange} value={formDetails.name} name="name"/>
                        <label htmlFor="email"> Email </label>
                        <input type="email" onChange={handleChange} value={formDetails.email} name="email"/>
                        <label htmlFor="phone"> Phone Number </label>
                        <input type="tel" onChange={handleChange} value={formDetails.phone} name="phone"/>
                    </div>

                    <div className={styles.appointmentmsg}>
                        <label htmlFor="data"> Pick a date </label>
                        <input type="date" onChange={handleChange} value={formDetails.date} name="date" />
                        <label htmlFor="kind"> What kind of Animal </label>
                        <input type="text" onChange={handleChange} value={formDetails.kind} name="kind"/>
                        <label htmlFor="msg"> Concern </label>
                        <textarea name="msg" onChange={handleChange} value={formDetails.msg} ></textarea>
                    </div>
                </div>
                <button onClick={submitAppointment} > Submit </button>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    )
}

export default SetAppointment