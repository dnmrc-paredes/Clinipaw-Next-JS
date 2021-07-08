import {FC} from 'react'
import Link from 'next/link'

// Styles
import styles from './header.module.scss'

export const Header: FC = () => {
    
    return (
        <nav className={styles.nav} >
            <div className={styles.navlogo}>
                <h1> CLINIPAW </h1>
            </div>
            
            <div className={styles.navlinks}>
                <Link href="/" > Home </Link>
                <Link href="/setappointment" > Set Appointment </Link>
                <Link href="/contact" > Contact </Link>
            </div>
        </nav>
    )

}
