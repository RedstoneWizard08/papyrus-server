import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Error404: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Papyrus v6 | Error</title>
        <meta name="description" content="Papyrus v6: Instant messaging - done right." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>404 | The page you requested could not be found.</p>
        <Link href="/">Back to Home</Link>
      </main>
    </div>
  );
}

export default Error404;
