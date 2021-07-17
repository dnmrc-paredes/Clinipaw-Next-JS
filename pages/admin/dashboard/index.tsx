import {NextPage, GetServerSideProps} from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useQuery } from 'react-query'
// import cookies from 'next-cookies'
import {useRouter} from 'next/router'
import axios from 'axios'

// Typescripts
import { Iappointment } from '../../../ts/appointment'

// Components
import { ScaleLoader } from 'react-spinners'

// Styles
import styles from './Dashboard.module.scss'

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const token = req.cookies.authToken

    if (!token) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }

    const {data, status} = await axios.get(`https://clinipaw.vercel.app/api/dashboard/${token}`)

    if (status >= 400) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            allAppointments: data.data,
            token
        }
    }

}

const Dashboard: NextPage<{allAppointments: Iappointment[], token: string}> = ({allAppointments, token}) => {

    const [limit, setLimit] = useState(0)
    const [appointments, setAppointments] = useState<Iappointment[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isMax, setIsMax] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const {data} = await axios.get<{status: string, data: Iappointment[], max: boolean, total: number}>(`/api/dashboard/allappointments/${token}/${limit}`)
            setIsMax(data.max)
            setAppointments(data.data)
            setIsLoading(false)
        }

        getData()
    }, [token, limit])

    return (
        <div className={styles.container}>
            <Head>
                <title> CliniPaw | Dashboard </title>
            </Head>
            
            <main>
                <div className={styles.title}>
                    <h1> Dashboard </h1>
                </div>

                <div className={styles.windows}>
                    <div className={styles.totalappointments}>
                        <h2> Total Appointments </h2>
                        <p> {allAppointments.length} </p>
                    </div>
                    
                    <div className={styles.recentappointments}>
                        <h2> Recent Appointments </h2>

                        {/* { !isLoading && (data.data.length <= 0) && <p> No Appointments </p> } */}
                        
                        { allAppointments.map(item => {
                            return <div onClick={() => router.push(`/admin/dashboard/appointment/${item._id}`)} className={styles.appointment} key={item._id}>
                                <p> {item.name} </p>
                                <p> {item.kind} </p>
                            </div>
                        }).slice(0,3) }
                    </div>
                </div>

                <div className={styles.allappointments}>
                    { isLoading && <div className={styles.loading}>
                        <ScaleLoader color={'teal'} />
                    </div> }

                    { !isLoading && <h1> All Appointments </h1>  }

                    <div className={styles.items}>

                        { !isLoading && (appointments.length <= 0) && <p> No Appointments </p> }

                        { !isLoading && appointments.map((item: Iappointment) => {
                            return <div onClick={() => router.push(`/admin/dashboard/appointment/${item._id}`)} className={styles.appointment} key={item._id}>
                                <p> {item.name} </p>
                                <p> {item.kind} </p>
                            </div>
                        }) }
                    </div>

                    { !isLoading && (appointments.length > 0) && <div className={styles.paginate}>
                        <button onClick={ async () => {
                            setLimit(prev => prev <= 0 ? prev+=0 : prev-=5 )
                        }} > &lt; </button>
                        { !isMax && <button onClick={ async () => {
                            setLimit(prev => prev+=5)
                        }} > &gt; </button> }
                    </div> }

                </div>
            </main>
        </div>
    )
}

export default Dashboard