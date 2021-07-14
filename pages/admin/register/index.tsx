import { NextPage, GetServerSideProps } from 'next'
import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

// Styles 
import styles from './Register.module.scss'
import 'react-toastify/dist/ReactToastify.css';

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    if (req.cookies['auth-token']) {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

const Register: NextPage = () => {

    // Toast
    const successToast = () => toast('Account created.', { type: 'success' })
    const errorToast = () => toast('Please fill all inputs.', { type: 'error' })
    const passwordToast = () => toast('Password must be 5 or 5 characters above.', { type: 'error' })

    const router = useRouter()
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })

    const registerSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const {name, email, password} = register

        if (!name || !email || !password) {
            return errorToast()
        }

        if (password.length < 5) {
            return passwordToast()
        }

        const {data} = await axios.post('/api/register', register)
        
        if (data.status === 'fail') {
            return toast('Email already exists.', {type: 'error'})
        }

        if (data.status === "ok") {
            successToast()
            setTimeout(() => {
                router.push('/admin/login')
            }, 3000)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setRegister({
            ...register,
            [name]: value
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Admin Register </title>
            </Head>

            <main>
                <form onSubmit={registerSubmit} method="post">
                    <h1> Register </h1>
                    <label htmlFor="name"> Full Name </label>
                    <input type="text" value={register.name} onChange={handleChange} name="name" />
                    <label htmlFor="email"> Email </label>
                    <input type="email" value={register.email} onChange={handleChange} name="email" />
                    <label htmlFor="password"> Password </label>
                    <input type="password" value={register.password} onChange={handleChange} name="password" />
                    <button type="submit"> Register </button>
                    <Link href="/admin/login" > Have an account? Login here. </Link>
                </form>
            </main>

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

export default Register