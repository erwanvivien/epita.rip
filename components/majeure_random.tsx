import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'


type RingProps = {
  isStop: boolean;
  shuffledMajeures: string[];
};

import availableDomains from '../public/majeures.json';

const majeures = Object.keys(availableDomains).map((m) => m.toLocaleUpperCase());

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
              `rotateX(${(360 / majeures.length) * idx}deg) translateX(-50%) scale(1.5) translateZ(200px)` :
              `rotateX(${(360 / majeures.length) * idx}deg) translateX(-50%) translateZ(200px)`,
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
