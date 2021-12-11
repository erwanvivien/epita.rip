import { useEffect, useState } from 'react';
import getConfig from 'next/config'
import styles from '../styles/Home.module.css'
import Head from 'next/head';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig()

type RingProps = {
  isStop: boolean;
  shuffledMajeures: string[];
};

import availableDomains from '../public/majeures.json';
import Triangle from './triangle';

const majeures = Object.keys(availableDomains).map((m) => m.toLocaleUpperCase());

const Ring = ({ isStop, shuffledMajeures }: RingProps) => {
  const additionalStyleRing = isStop ? {
    animationIterationCount: 1,
    animationTimingFunction: "ease-out",
    animationDuration: "1s",
  } : {};

  const redir_uri: string = publicRuntimeConfig.redirectUrl;
  const formatUrl = (majeure: string) =>
    `http${redir_uri.includes('localhost') ? '' : 's'}://${majeure}.${redir_uri}`

  return (
    <div className={styles.ring} style={additionalStyleRing}>
      <div
        className={styles.poster + (isStop ? ` ${styles.selected_majeure}` : '')}
        style={{
          transform: isStop ? 'rotateX(0deg) translateX(-50%) scale(1.5) translateZ(200px)' :
            'rotateX(0deg) translateX(-50%) translateZ(200px)',
          opacity: isStop ? 1 : 0.7,
        }}
        onClick={() => { window.location.href = formatUrl(shuffledMajeures[0]) }}
      >
        {isStop &&
          <div className={styles.triangle_container} style={{

          }}>
            {[...Array(6)].map((_, idx) => (
              <Triangle key={idx} />
            ))}
          </div>}

        <p className={styles.itemsText}>
          {shuffledMajeures[0]}
        </p>
      </div>

      {shuffledMajeures.slice(1).map((majeure, idx) => (
        <div key={idx}
          className={styles.poster}
          style={{
            transform: `rotateX(${(360 / majeures.length) * (idx + 1)}deg) translateX(-50%) translateZ(200px)`,
            opacity: isStop ? 1 : 0.7,
          }}
          onClick={() => { window.location.href = formatUrl(majeure) }}
        >
          <p className={styles.itemsText}>
            {majeure}
          </p>
        </div>
      ))}
    </div>
  )
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const MajeureRandom = () => {
  const [stop, setStop] = useState(false);
  const [shuffle, setshuffle] = useState(majeures);

  const refresh = () => {
    setStop(false);
    setshuffle(shuffleArray(majeures))
  }

  useEffect(() => {
    setshuffle(shuffleArray(majeures));
  }, [])

  const title = `EPITA R.I.P.`;
  const description = `EPITA R.I.P.
Comment bien choisir sa majeure à EPITA ?
Nous allons choisir pour vous !`;
  const imageUrl = 'https://epita.rip/epita.svg';
  const url = 'https://epita.rip';

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content="EPITA, majeure, roulette, random, choisir, choice" />
        <meta name="author" content="Erwan Vivien" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={url} />
      </Head>
      <div className={styles.stage}>
        <div className={styles.rotate}>
          <Ring isStop={stop} shuffledMajeures={shuffle} />
          {!stop &&
            <button className={styles.button} onClick={() => setStop(true)}>
              Gogo gadgeto Random()
            </button> ||
            <button className={styles.button} onClick={refresh}>
              Re-roll
            </button>
          }
        </div>
      </div >
    </>
  )
}


export default MajeureRandom;
