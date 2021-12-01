import styles from '../styles/Majeure.module.css'
import stylesMajeure from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Triangle from './triangle';

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
            <Triangle key={idx} />
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
