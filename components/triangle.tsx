import styles from '../styles/Majeure.module.css'

const Triangle = () => {
  return (
    <svg className={styles.shape} viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
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
  )
}

export default Triangle
