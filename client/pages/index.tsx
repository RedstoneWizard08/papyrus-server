import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import io from 'socket.io-client';
import Link from 'next/link';

const socket = io();

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Papyrus v6</title>
        <meta name="description" content="Papyrus v6: Instant messaging - done right." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/help">HELP</Link>
      </main>
    </div>
  );
}

export default Home;
