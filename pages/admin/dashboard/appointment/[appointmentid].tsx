import {NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import axios from 'axios'

// Typescript
import { Iappointment } from '../../../../ts/appointment'

// Components
import { ScaleLoader } from 'react-spinners'

// Styles
import styles from './Appointment.module.scss'

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [
            { params: { appointmentid: '1' } }
        ],
        fallback: true,
    }

}

// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//     const id = params?.appointmentid
//     console.log(id)

//     return {
//         props: {}
//     }

// }

export const getStaticProps: GetStaticProps = async ({params}) => {

    const id = params?.appointmentid
    const {data} = await axios.get(`http://localhost:3000/api/dashboard/oneappointment/${id}`)
    
    if (data.data === null) {
        return {
            redirect: '404',
            props: {}
        }
    }

    return {
        props: { appointment: data.data },
        revalidate: 1
    }

}

const OneAppointment: NextPage<{appointment: Iappointment}> = ({appointment}) => {

    if (!appointment) {
        return (
            <div className={styles.loading}>
                <ScaleLoader speedMultiplier={2} color={'teal'} />
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Appointment </title>
            </Head>

            <main>
                <div className={styles.appointment}>
                    <h3> From: {appointment.email} </h3>
                    <h3> Phone: +63{appointment.phone} </h3>
                    <p> Concern: <strong> {appointment.msg} </strong> </p>
                </div>
            </main>
        </div>
    )
}

export default OneAppointment