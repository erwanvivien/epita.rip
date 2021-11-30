import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react';
import { setRequestMeta } from 'next/dist/server/request-meta';
import MajeureFound from '../components/majeure';

const subdomainReg =
  /([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.|localhost:*)/;

const availableDomains = {
  gistre: "Gistred",
  mti: "MTIed",
  scia: "SCIAed",
  tcom: "TCOMed",
  gitm: "GITM'd",
  image: "IMAGEd",
  sante: "SANTEd",
  sigl: "SIGL'd",
  srs: "SRSed",
  ice: "Ice'd",
}

const majeures = Object.keys(availableDomains).map((m) => m.toLocaleUpperCase());

type Props = {
  subdomain: string,
  epiteanSub: boolean,
};

type RingProps = {
  isStop: boolean;
  shuffledMajeures: string[];
};

const classNamesMajeure = [
  "hidden",
  "hidden",
  "hidden",
  "quarter",
  "half",
  "full",
  "half",
  "quarter",
  "hidden",
  "hidden",
];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Ring = ({ isStop, shuffledMajeures }: RingProps) => {
  const additionalStyles = isStop ? {
    animationIterationCount: 1,
    animationTimingFunction: "ease-out",
    animationDuration: "1s",
  } : {};

  return (
    <div className={styles.ring} style={additionalStyles}>
      {shuffledMajeures.map((majeure, idx) => (
        <div key={idx}
          className={styles.poster + (isStop && idx === 0 ? ` ${styles.selected_majeure}` : '')}
          style={{
            transform: isStop && idx === 0 ?
              `rotateX(${(360 / classNamesMajeure.length) * idx}deg) translateX(-50%) scale(1.5) translateZ(200px)` :
              `rotateX(${(360 / classNamesMajeure.length) * idx}deg) translateX(-50%) translateZ(200px)`,
            backgroundColor: isStop && idx === 0 ? "red" : "",
            opacity: isStop ? 1 : 0.7,

            position: 'absolute',
          }}
        >
          {isStop && idx === 0 &&
            <div style={{
              height: "100px",
              width: "100%",
              display: 'flex',
              flexDirection: "row",
              position: 'absolute',
              top: '0px',
              overflow: 'hidden',
              borderRadius: 4,
              zIndex: -1,
            }}>
              {[...Array(6)].map((_, idx) => (
                <svg className={styles.shape} key={idx} viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
                  <polygon points="" fill="none" stroke="hsl(320,100%,70%)" stroke-width="5">
                    <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="0s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
                  </polygon>
                  <polygon points="" fill="none" stroke="hsl(240,100%,70%)" stroke-width="5">
                    <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="1s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
                  </polygon>
                  <polygon points="" fill="none" stroke="hsl(160,100%,70%)" stroke-width="5">
                    <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="2s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
                  </polygon>
                  <polygon points="" fill="none" stroke="hsl(80,100%,70%)" stroke-width="5">
                    <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="3s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
                  </polygon>
                </svg>
              ))}
            </div>}

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

export default function Home({ subdomain, epiteanSub }: Props) {
  const [stop, setStop] = useState(false);
  const [suffle, setshuffle] = useState(majeures)

  useEffect(() => {
    setshuffle(shuffleArray(majeures));
  })

  if (epiteanSub) {
    const text = availableDomains[subdomain];
    return (
      <>
        <MajeureFound />
        <div className={styles.container}>
          <h1 className={styles.majeure}>
            {text}
          </h1>
        </div>
      </>
    )
  }

  return (
    <div className={styles.stage}>
      <div className={styles.rotate}>
        <Ring isStop={stop} shuffledMajeures={suffle} />
        <button className={styles.button} onClick={() => setStop(true)}>
          Gogo gadgeto Random()
        </button>
      </div>
    </div >
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const host = ctx.req.headers['x-forwarded-host'] || ctx.req.headers['host'];
  const subdomainMatch = typeof host === "string"
    ? host.match(subdomainReg) : host[0].match(subdomainReg);
  const subdomain = subdomainMatch && subdomainMatch.at(1);

  const epiteanSub = (subdomain in availableDomains);

  if (subdomain && !epiteanSub) {
    return {
      redirect: {
        destination: 'http://localhost:3000',
        permanent: false,
      },
    }
  }

  return {
    props: {
      subdomain: subdomain,
      epiteanSub: epiteanSub,
    }
  }
}
