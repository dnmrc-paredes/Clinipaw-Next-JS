import {NextPage, GetServerSideProps} from 'next'

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    if (!req.cookies['auth-token']) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

const Dashboard: NextPage = () => {
    return (
        <div>
            <h1> Dashboard </h1>
        </div>
    )
}

export default Dashboard