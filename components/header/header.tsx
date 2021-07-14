import {FC} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { LOGGED_OUT } from '../../redux/actions/actions'

// Typescript
import { Istate } from '../../ts/state'

// Styles
import styles from './header.module.scss'

export const Header: FC = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isAuth = useSelector((state: Istate) => state.auth)

    const logout = () => {
        dispatch(LOGGED_OUT())
        document.cookie = 'authToken='
        router.push('/admin/login')
    }
    
    return (
        <nav className={styles.nav} >
            <div className={styles.navlogo}>
                <h1> CLINIPAW </h1>
            </div>
            
            { isAuth ? <div className={styles.navlinks}>
                <Link href="/admin/dashboard" > Dashboard </Link>
                <p onClick={logout} > Logout </p>
            </div> : <div className={styles.navlinks}>
                <Link href="/" > Home </Link>
                <Link href="/setappointment" > Set Appointment </Link>
                <Link href="/contact" > Contact </Link>
            </div> }


        </nav>
    )

}
