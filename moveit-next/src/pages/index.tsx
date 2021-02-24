import { CompletedChallanges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import Head from 'next/head';

import styles from '../styles/components/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.It</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallanges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  )
}
