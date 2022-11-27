import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            进入博客 🛫️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  const [govRecordText, setGovRecordText] = useState<string>('沪ICP备18047501号-1');
  useEffect(() => {
    if (location.host.includes('aweffr.com')) {
      setGovRecordText('沪ICP备18047501号-2');
    }
  }, []);

  return (
    <>
      <Layout
        title={`${siteConfig.title}`}
        description="aweffr的个人博客">
        <HomepageHeader/>
        <main>
          <HomepageFeatures/>
        </main>
      </Layout>
      <div className={clsx("footer", "footer--dark", styles.footerBeian)}>
        {`Copyright © ${new Date().getFullYear()} | `}
        <a className={styles.footerBeianLink} href="https://beian.miit.gov.cn/" target="_blank">{govRecordText}</a>
      </div>
    </>
  );
}
