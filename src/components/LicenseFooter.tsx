import React, {useEffect, useMemo, useState} from 'react';
import clsx from "clsx";
import styles from "@site/src/pages/index.module.css";
import BrowserOnly from '@docusaurus/BrowserOnly';

const defaultGovRecordText = '沪ICP备18047501号';

const LicenseFooter = () => {

  const [govRecordText, setGovRecordText] = useState<string>('');
  useEffect(() => {
    if (location.host.includes('aweffr.com')) {
      setGovRecordText('沪ICP备18047501号-2');
    } else {
      setGovRecordText('沪ICP备18047501号-1');
    }
  }, []);

  const hrefEl = useMemo(() => {
    const _govRecordText = govRecordText || defaultGovRecordText;
    return (
      <div className={clsx("footer", "footer--dark", styles.footerBeian)}>
        {`Copyright © ${new Date().getFullYear()} | `}
        <a className={styles.footerBeianLink} href="https://beian.miit.gov.cn/" target="_blank">{_govRecordText}</a>
      </div>
    )
  }, [govRecordText]);


  return (
    <BrowserOnly fallback={hrefEl}>
      {
        () => hrefEl
      }
    </BrowserOnly>
  );
};

export default LicenseFooter;
