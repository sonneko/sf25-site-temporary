import React from 'react';
import styles from './News.module.scss';
import Link from 'next/link';

type NewsItem = {
  date: string;
  title: string;
  id: string;
};

const newsItems: NewsItem[] = [
  { date: '2023.10.26', title: '学園祭の準備が着々と進んでいます！', id: '' },
  {
    date: '2023.10.20',
    title: '出展ブースが決定しました。詳細は後日発表！',
    id: '',
  },
  { date: '2023.10.15', title: '公式サイトを公開しました。', id: '' },
];

export default function News() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>News</h2>
        <div className={styles.newsBox}>
          {newsItems.map((item, index) => (
            <div className={styles.newsItem} key={index}>
              <div className={styles.date}>［{item.date}］</div>
              <Link href={`/news/${item.id}`}>
                <div className={styles.description}>{item.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
