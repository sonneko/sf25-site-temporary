import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.sitemap}>
        <h3>Sitemap</h3>
        <ul className={styles.sitemapList}>
          {[
            { href: '/', text: 'トップページ' },
            { href: '/info', text: '開催情報' },
            { href: '/stage', text: 'ステージ企画' },
            { href: '/booth', text: '企画一覧' },
            { href: '/map', text: '会場地図' },
            { href: '/search', text: '企画検索' },
          ].map((item, index) => (
            <li className={styles.sitemapItem} key={index}>
              <Link href={item.href}>
                <p>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footerInfo}>
        <p>
          &copy; 大阪星光学院スクールフェア2025運営委員会 All Rights Reserved.
        </p>
      </div>

      <div className={styles.logo}>
        <img src='/icon/sf-logo-color.svg' width={150} />
      </div>
    </footer>
  );
}
