import {NextPage, GetServerSideProps} from 'next'
import { useState } from 'react'
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

    // const token = cookies({req}).authToken
    const token = req.cookies.authToken
    // console.log(req.cookies)
    // console.log(token)

    if (!token) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }

    const {data} = await axios.get(`http://localhost:3000/api/dashboard/${token}`)

    return {
        props: {
            allAppointments: data.data,
            token
        }
    }

}

const Dashboard: NextPage<{allAppointments: Iappointment[], token: string}> = ({allAppointments, token}) => {

    // console.log(allAppointments)

    // const taetae = async () => {
    //     return await axios.get(`/api/try/dinmarc/kubore`)
    // }

    // console.log(taetae())

    const [limit, setLimit] = useState(0)

    const fetchData = async () => {
        return (await axios.get(`/api/dashboard/allappointments/${token}/${limit}`)).data
    }

    const { data, isLoading, refetch } = useQuery('getData', fetchData)
    // console.log(data.data)
    // const nest = data.data as Iappointment[]
    // console.log(error)
    // console.log(status)
    const router = useRouter()
    // const [all, setAll] = useState(nest) as Iappointment[]

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
                        { !isLoading && data.data.map((item: Iappointment) => {
                            return <div onClick={() => router.push(`/admin/dashboard/appointment/${item._id}`)} className={styles.appointment} key={item._id}>
                                <p> {item.name} </p>
                                <p> {item.kind} </p>
                            </div>
                        }) }
                    </div>

                    <div className={styles.paginate}>
                        <button onClick={() => {
                            setLimit(prev => prev-=5)
                            refetch({
                                throwOnError: true
                            })
                        }} > &lt; </button>
                        <button onClick={() => {
                            setLimit(prev => prev+=5)
                            refetch({
                                throwOnError: true
                            })
                        }} > &gt; </button>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Dashboard