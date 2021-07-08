import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        
        <section id={styles.sect1}>
          <div className={styles.sect1info}>
            <h2> Choose the best for you pet </h2>
            <p> Set up an appointment now. </p>
            <button> Reserve </button> 
          </div>

          <div className={styles.sect1img}>
            <Image width="500" height="500" src="/isometric-clinic.svg" alt="isometric-clinic" />
          </div>
        </section>

        <section id={styles.sect2}>
          <div className={styles.sect2info}>
            <Image src="/vaccine.svg" width="400" height="400" alt="vaccine" />
            <div className={styles.details}>
              <h2> Always take care of you pets. </h2>
            </div>
          </div>
        </section>

        <section id={styles.sect3}>
          <div className={styles.sect3info1}>
            <Image src="/diff.svg" width="300" height="300" alt="vaccine" />
            <h1> We take care all kinds of pets. </h1>
            {/* <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam harum dignissimos magnam animi voluptate officiis! </p> */}
            <p> Here at Clinipaw We always take care of our customer&apos;s pets no matter what kind.</p>
          </div>

          <div className={styles.sect3info2}>
            <Image src="/24hours.svg" width="300" height="300" alt="vaccine" />
            <h1> Always 24 hours of service. </h1>
            {/* <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quasi expedita soluta. Hic ut deleniti velit illo fugit? Ut, placeat. </p> */}
            <p> Our service is open for 24 hours, we are always available in times of need. </p>
          </div>
        </section>

      </main>

    </div>
  )
}
