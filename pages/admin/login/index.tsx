import { NextPage } from "next"
import { useState, FormEvent, ChangeEvent } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'

// Styles
import styles from './Login.module.scss'

const Login: NextPage = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const loginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const {data} = await axios.post('/api/login', login)
        console.log(data)

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
        </div>
    )
}

export default Login