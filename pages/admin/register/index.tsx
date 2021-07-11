import { NextPage } from 'next'
import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

// Styles 
import styles from './Register.module.scss'

const Register: NextPage = () => {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })

    const registerSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const {data} = await axios.post('/api/register', register)
        console.log(data)
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
        </div>
    )

}

export default Register