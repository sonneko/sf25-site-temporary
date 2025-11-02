'use client';

import { useState, useRef } from 'react';
import styles from './Map.module.scss';
import 'pinch-zoom-element';

type Layer = 1 | 2 | 3 | 4 | 5;

// TODO: 最適化の余地あり
export default function Map() {
  const [nowLayer, setNowLayer] = useState<Layer>(1);
  const [is_highschool, setIs_highschool] = useState<boolean>(false);
  const pinchTargetRef = useRef<HTMLDivElement>(null);

  const upButtonHandler = () => {
    if (nowLayer === 5) {
      // disableに設定しているのでここでエラーは出ないはず
      throw new Error('already top layer!');
    }
    // 5の時はneverなので nowLayer + 1 は必ずLayerの範囲内
    setNowLayer((nowLayer + 1) as Layer);
  };

  const downButtonHandler = () => {
    if (nowLayer === 1) {
      throw new Error('already bottom layer!');
    }
    // 1の時はneverなので nowLayer - 1 は必ずLayerの範囲内
    setNowLayer((nowLayer - 1) as Layer);
  };

  return (
    <>
      <div className={styles.map_container}>
        <div className={styles.button_container}>
          <div className={`${styles.layer_display} ${styles.button_block}`}>
            {nowLayer}階
          </div>
          <button
            className={`${styles.upButton} ${styles.button_block}`}
            onClick={upButtonHandler}
            disabled={nowLayer === 5}
          >
            &nbsp;↑&nbsp;
          </button>
          <button
            className={`${styles.downButton} ${styles.button_block}`}
            onClick={downButtonHandler}
            disabled={nowLayer === 1}
          >
            &nbsp;↓&nbsp;
          </button>
          <button
            className={styles.button_block}
            onClick={() => setIs_highschool(!is_highschool)}
            disabled={nowLayer === 1 || nowLayer === 5}
          >
            {!(nowLayer === 1 || nowLayer === 5) ? (
              is_highschool ? (
                '高校'
              ) : (
                '中学'
              )
            ) : (
              <>両方</>
            )}
          </button>
        </div>
        <div className={styles.map}>
          <pinch-zoom ref={pinchTargetRef} className={styles.map_svg}>
            <img src={`/map/${is_highschool ? 'h' : 'm'}f${nowLayer}.jpeg`} />
          </pinch-zoom>
          <p className={styles.map_ui}>ピンチアウトで拡大縮小できます</p>
        </div>
      </div>
    </>
  );
}
