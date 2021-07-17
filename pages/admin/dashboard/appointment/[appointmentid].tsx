import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

// Typescript
import { Iappointment } from '../../../../ts/appointment'

// Components
import { ScaleLoader } from 'react-spinners'

// Styles & Icons
import styles from './Appointment.module.scss'
import { MdMoreHoriz } from 'react-icons/md'

// export const getStaticPaths: GetStaticPaths = () => {

//     return {
//         paths: [
//             { params: { appointmentid: '1' } }
//         ],
//         fallback: true,
//     }

// }

export const getServerSideProps: GetServerSideProps = async ({query}) => {

    const id = query?.appointmentid
    const { data, status } = await axios.get(`http://localhost:3000/api/dashboard/oneappointment/${id}`)
    // console.log(query)

    // console.log(data)
    console.log(status)
    
    if (status === 400) {
        console.log('sdfsafasdf')
        return {
            redirect: '404',
            props: {}
        }
    }

    return {
        props: { appointment: data.data }
    }

}

// export const getStaticProps: GetStaticProps = async ({params}) => {

//     const id = params?.appointmentid
//     const {data} = await axios.get(`http://localhost:3000/api/dashboard/oneappointment/${id}`)

//     console.log(data)
    
//     if (!data.data) {
//         console.log('sdfsafasdf')
//         return {
//             redirect: '/404',
//             props: {}
//         }
//     }

//     return {
//         props: { appointment: data.data },
//         revalidate: 1
//     }

// }

const OneAppointment: NextPage<{appointment: Iappointment}> = ({appointment}) => {

    const router = useRouter()
    const [toggle, setToggle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    // if (!appointment) {
    //     router.push('/404')
    // }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <ScaleLoader speedMultiplier={2} color={'teal'} />
            </div>
        )
    }

    const markAsDone = async (id: string) => {
        setIsLoading(true)
        await axios.patch(`/api/dashboard/status/${id}`)
        await router.push(router.asPath)
        setIsLoading(false)
    }
    
    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Appointment </title>
            </Head>

            <main>
                <div className={styles.appointment}>
                    <div className={styles.togglestatus}>
                        <MdMoreHoriz onClick={() => setToggle(!toggle)} size={30} />
                        
                        { toggle && <div className={styles.options}>
                            <p onClick={() => markAsDone(appointment._id)} > { !appointment.status ? 'Mark as Done' : 'Mark as Undone' } </p>
                            <p> Cancel </p>
                        </div> }
                    </div>
                    
                    <div className={styles.details}>
                        <h3> From: {appointment.email} </h3>
                        <h3> Phone: +63{appointment.phone} </h3>
                        <h3> Status: { !appointment.status ? 'Pending' : "Done" } </h3>
                        <p> <strong> Concern: </strong> </p>
                        <p> {appointment.msg} </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OneAppointment