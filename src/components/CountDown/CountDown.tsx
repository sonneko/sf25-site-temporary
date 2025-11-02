import styles from './CountDown.module.scss';

export default function CountDown() {
  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <span className={`${styles.first} ${styles.span}`}>
          <span className={styles.phoneHide}>開催まで</span>あと
        </span>
        <span className={`${styles.second} ${styles.span}`}>
          <span className={styles.spanDigit}>0</span>
        </span>
        <span className={`${styles.third} ${styles.span}`}>日</span>
      </div>
    </div>
  );
}
