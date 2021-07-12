import { NextPage, GetServerSideProps } from "next"
import { useState, FormEvent, ChangeEvent } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { toast, ToastContainer } from "react-toastify"

// Styles
import styles from './Login.module.scss'
import 'react-toastify/dist/ReactToastify.css';

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    return {
        props: {}
    }

}

const Login: NextPage = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const loginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const {data} = await axios.post('/api/login', login)
        
        if (data.status === 'fail') {
            return toast(data.msg, {type: 'error'})
        }
        
        document.cookie = `auth-token=${data.token}`

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setLogin({
            ...login,
            [name]: value
        })

    }

    return (
        <div className={styles.container} >
            <Head>
                <title> CliniPaw | Admin Login </title>
            </Head>

            <main>
                <form onSubmit={loginSubmit} method="post">
                    <h1> Login </h1>
                    <label htmlFor="email"> Email </label>
                    <input type="email" value={login.email} onChange={handleChange} name="email" />
                    <label htmlFor="password"> Password </label>
                    <input type="password" value={login.password} onChange={handleChange} name="password" />
                    <button type="submit"> Login </button>
                    <Link href="/admin/register" > Register for an account.  </Link>
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

export default Login