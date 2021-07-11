import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Styles
import styles from '../styles/Error.module.scss'

const ErrorPage: NextPage = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Page Not Found </title>
            </Head>

            <main>
                <h2> Page not found, Click <Link href="/"> here </Link> to navigate back. </h2>
            </main>
        </div>
    )

}

export default ErrorPage