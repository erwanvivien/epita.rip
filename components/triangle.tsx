import styles from '../styles/Majeure.module.css'

type TriangleProps = {
  majeure: string;
}

const hashCode = function (str: string) {
  let hash = 0;
  let chr: number;

  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};


const Triangle = ({ majeure }: TriangleProps) => {
  const hash = hashCode(majeure);
  const r = (hash >> 16) & 0xFF;
  const g = (hash >> 8) & 0xFF;
  const b = (hash >> 0) & 0xFF;
  const hue = (hash % 320 + 320) % 320;

  return (
    <svg className={styles.shape} viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
      <polygon points="" fill="none" stroke={`rgb(${r}, ${g}, ${b})`} strokeWidth="5">
        <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="0s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
      </polygon>
      <polygon points="" fill="none" stroke={`rgb(${b}, ${r}, ${g})`} strokeWidth="5">
        <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="1s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
      </polygon>
      <polygon points="" fill="none" stroke={`rgb(${g}, ${b}, ${r})`} strokeWidth="5">
        <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="2s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
      </polygon>
      <polygon points="" fill="none" stroke={`hsl(${hue},100%,70%)`} strokeWidth="5">
        <animate attributeName="points" repeatCount="indefinite" dur="4s" begin="3s" from="50 57.5, 50 57.5, 50 57.5" to="50 -75, 175 126, -75 126"></animate>
      </polygon>
    </svg>
  )
}

export default Triangle
