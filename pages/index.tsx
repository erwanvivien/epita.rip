import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

const subdomainReg =
  /([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.|localhost)/;

const availableDomains = {
  "gistre": "Gistred",
  "mti": "MTIed",
  "scia": "SCIAed",
  "tcom": "TCOMed",
  "gitm": "GITM'd",
  "image": "IMAGEd",
  "sante": "SANTEd",
  "sigl": "SIGL'd",
  "srs": "SRSed",
  "ice": "Ice'd",
}

export default function Home({ host }: { host: string }) {
  const match = host.match(subdomainReg);
  if (match && match.at(1) in availableDomains) {
    return (
      <div className={styles.container}>
        {availableDomains[match.at(1)]}
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
  const host = ctx.req.headers['x-forwarded-host'] || ctx.req.headers['host']

  return {
    props: {
      host
    }
  }
}
