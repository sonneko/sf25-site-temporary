'use client';
import React, { useState, useEffect } from 'react';
import styles from './TopSlideShow.module.scss';

const SLIDESHOW_DELAY = 3000;

function useSlideShow(urlList: string[], delay: number) {
  if (urlList.length <= 1) {
    throw new Error(
      'useSlideShowHook only accept urlList whoes length is 2 or more.'
    );
  }
  const [slideShowUrlIndex, setSlideShowUrlIndex] = useState<number>(0);
  const routine = () => {
    setSlideShowUrlIndex(pre => (pre === urlList.length - 1 ? 0 : pre + 1));
  };
  useEffect(() => {
    const id = setInterval(routine, delay);
    return () => {
      clearInterval(id);
    };
  }, []);

  return urlList[slideShowUrlIndex];
}

const imageUrlList = [
  '/slideshow/1.jpeg',
  '/slideshow/2.jpeg',
  '/slideshow/3.jpeg',
];

export default function TopSlideShow() {
  const nowUrl = useSlideShow(imageUrlList, SLIDESHOW_DELAY);

  const title = 'SEIKO SF25';
  const subtitle = 'Osaka Seiko School Fair 2025';

  return (
    <div className={styles.topSlideShowContainer}>
      <img src={nowUrl} alt={title} className={styles.topSlideShowImage} />
      <div className={styles.topSlideShowOverlay}>
        <h1 className={styles.topSlideShowTitle}>{title}</h1>
        <span className={styles.topSlideShowSubtitle}>{subtitle}</span>
      </div>
    </div>
  );
}
