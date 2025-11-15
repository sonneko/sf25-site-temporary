'use client';

import styles from './PannhirettoDownloadButton.module.scss';

import { useState } from 'react';

export default function PannhirettoDownloadButton() {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return (
    <>
      <button onClick={toggle} className={styles.button}>
        パンフレットをダウンロード
      </button>
      {isShowing === true ? (
        <>
          <div className={styles.telopBg}>
            <div className={styles.telop}>
              <h3>パンフレットをダウンロードする</h3>
              <p>
                パンフレットダウンロードのためには以下の規約に同意する必要があります。
              </p>
              <div className={styles.listBox}>
                <ul className={styles.list}>
                  <li>インターネット上に再公開しない</li>
                  <li>無断で改変しない</li>
                </ul>
              </div>
              <div className={styles.buttons}>
                <a
                  href='/pamphlet.pdf'
                  onClick={() => setIsShowing(false)}
                  className={styles.downloadUrl}
                >
                  ダウンロードする
                </a>
                <a
                  onClick={() => setIsShowing(false)}
                  className={styles.foldButton}
                >
                  閉じる
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
