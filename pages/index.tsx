import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'

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

type Props = {
  subdomain: string,
  epiteanSub: boolean,
};

export default function Home({ subdomain, epiteanSub }: Props) {
  if (epiteanSub) {
    const text = availableDomains[subdomain];
    return (
      <div className={styles.container}>
        <h1 className={styles.majeure}>
          {text}
        </h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      Default
    </div>
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
