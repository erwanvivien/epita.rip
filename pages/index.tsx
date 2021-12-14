import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react';
import { setRequestMeta } from 'next/dist/server/request-meta';
import MajeureFound from '../components/majeure';

const subdomainReg =
  /([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.|localhost:*)/;

import availableDomains from '../public/majeures.json';
import MajeureRandom from '../components/majeure_random';

type Props = {
  subdomain: string;
  epiteanSub: boolean;
};


export default function Home({ subdomain, epiteanSub }: Props) {
  if (epiteanSub) {
    return <MajeureFound subdomain={subdomain} />
  }
  return <MajeureRandom />
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
