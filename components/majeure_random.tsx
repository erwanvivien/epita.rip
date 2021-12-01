import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'


type RingProps = {
  isStop: boolean;
  shuffledMajeures: string[];
};

import availableDomains from '../public/majeures.json';
import Triangle from './triangle';

const majeures = Object.keys(availableDomains).map((m) => m.toLocaleUpperCase());

const Ring = ({ isStop, shuffledMajeures }: RingProps) => {
  const additionalStyles = isStop ? {
    animationIterationCount: 1,
    animationTimingFunction: "ease-out",
    animationDuration: "1s",
  } : {};

  return (
    <div className={styles.ring} style={additionalStyles}>
      <div
        className={styles.poster + (isStop ? ` ${styles.selected_majeure}` : '')}
        style={{
          borderWidth: 0,
          transform: isStop ?
            `rotateX(0deg) translateX(-50%) scale(1.5) translateZ(200px)` :
            `rotateX(0deg) translateX(-50%) translateZ(200px)`,
          backgroundColor: isStop ? "red" : "",
          opacity: isStop ? 1 : 0.7,

          position: 'absolute',
          cursor: 'pointer',
        }}

        onClick={() => { window.location.href = `http://${shuffledMajeures[0]}.${process.env.REDIRECT_URL}` }}
      >
        {isStop &&
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
            borderWidth: 0,
            transform: `rotateX(${(360 / majeures.length) * (idx + 1)}deg) translateX(-50%) translateZ(200px)`,
            opacity: isStop ? 1 : 0.7,

            position: 'absolute',
            cursor: 'pointer',
          }}
          onClick={() => { window.location.href = `http://${majeure}.${process.env.REDIRECT_URL}` }}
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
  const [shuffle, setshuffle] = useState(majeures)

  useEffect(() => {
    setshuffle(shuffleArray(majeures));
  }, [])

  return (
    <div className={styles.stage}>
      <div className={styles.rotate}>
        <Ring isStop={stop} shuffledMajeures={shuffle} />
        <button className={styles.button} onClick={() => setStop(true)}>
          Gogo gadgeto Random()
        </button>
      </div>
    </div >
  )
}


export default MajeureRandom;
