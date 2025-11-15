import styles from './page.module.scss';

export default function NazoSpecialPage() {
  return (
    <>
      <div className={styles.container}>
        <h1>周遊謎</h1>
        <p>
          星光学院の学舎を回りながら謎を解く「周遊謎」をご用意いたしました。
          <b>参加費は不要</b>です。謎を解くのに必要なのはあなたのひらめきのみ！
        </p>
        <p>
          最後の答えを導くと、景品をゲットすることもできます。ぜひ挑戦してみてください!!
        </p>

        <h3>遊び方</h3>
        <p>①A〜Jの謎を解こう(ヒントもあります)</p>
        <p>&nbsp;&nbsp; A〜G：どこでも解ける問題</p>
        <p>&nbsp;&nbsp; H〜J：特定の場所だけで解ける問題</p>

        <p>②「最後の答え」を導こう</p>
        <p>③2階の生徒指導室へ向かい、景品をもらおう</p>

        <h3>注意</h3>
        <p>
          H〜Jの問題などを解く際は、必要な箇所を写真に撮って広い場所で解くようにお願いします。
        </p>
        <p>周囲の方の迷惑にならないようお気をつけください。</p>

        <h3>問題</h3>

        <div className={styles.images}>
          <img
            src='/nazo-images/1.jpeg'
            width={1000}
            className={styles.img}
          ></img>
          <img
            src='/nazo-images/2.jpeg'
            width={1000}
            className={styles.img}
          ></img>
          <img
            src='/nazo-images/3.jpeg'
            width={1000}
            className={styles.img}
          ></img>
          <img
            src='/nazo-images/4.jpeg'
            width={500}
            className={styles.img}
          ></img>
        </div>

        <h3>ヒント</h3>

        <div className={`${styles.images} ${styles.hint}`}>
          <img
            src='/nazo-images/5.jpeg'
            width={500}
            className={styles.img}
          ></img>
          <img
            src='/nazo-images/6.jpeg'
            width={500}
            className={styles.img}
          ></img>
        </div>
      </div>
    </>
  );
}
