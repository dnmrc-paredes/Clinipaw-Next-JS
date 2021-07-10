import {NextPage} from 'next'
import Head from 'next/head'

// Styles & Icons
import styles from './contact.module.scss'
import {SocialIcon} from 'react-social-icons'

const Contact = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Contact </title>
            </Head>

            <main>
                <div className={styles.contact}>
                    <div className={styles.details}>
                        <h1> Contact Us </h1>
                        <p> Email: clinicpaw@gmail.com </p>
                        <p> Telephone: 0999-999-9999 </p>
                    </div>
                    
                    <div className={styles.icons}>
                        <SocialIcon url="https://www.facebook.com/" className={styles.icon} network="facebook" />
                        <SocialIcon url="https://www.instagram.com/" className={styles.icon} network="instagram" />
                        <SocialIcon url="https://twitter.com/" className={styles.icon} network="twitter" />
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Contact