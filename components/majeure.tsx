import styles from '../styles/Majeure.module.css'
import stylesMajeure from '../styles/Home.module.css'
import Head from 'next/Head';
import { useEffect, useState } from 'react';

type PropsMajeure = {
  text: string;
}

const MajeureFound = ({ text }: PropsMajeure) => {
  const title = `EPITA R.I.P. — ${text}`;
  const description = `EPITA R.I.P. — ${text},
Comment bien choisir sa majeure à EPITA ?,
Nous avons choisi ${text} pour vous !`;
  const imageUrl = 'https://epita.rip/epita.svg';
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.hostname);
  }, []);

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

      <div className={styles.overlay}>
        <div className={styles.container}>
          {[...Array(60)].map((_, idx) => (
            <svg className={styles.shape} key={idx} viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
              <polygon points="" fill="none" stroke="hsl(320,100%,70%)" strokeWidth="5">
                <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="0s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
              </polygon>
              <polygon points="" fill="none" stroke="hsl(240,100%,70%)" strokeWidth="5">
                <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="1s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
              </polygon>
              <polygon points="" fill="none" stroke="hsl(160,100%,70%)" strokeWidth="5">
                <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="2s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
              </polygon>
              <polygon points="" fill="none" stroke="hsl(80,100%,70%)" strokeWidth="5">
                <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="3s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
              </polygon>
            </svg>
          ))}
        </div>
      </div>
      <div className={stylesMajeure.container}>
        <h1 className={stylesMajeure.majeure}>
          {text}
        </h1>
      </div>
    </>
  )
}

export default MajeureFound;
