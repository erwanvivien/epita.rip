import styles from '../styles/Majeure.module.css'
import stylesMajeure from '../styles/Home.module.css'

type PropsMajeure = {
  text: string;
}

const MajeureFound = ({ text }: PropsMajeure) => {
  return (
    <>
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
