import Access from '@/components/Access/Access';
import styles from './page.module.scss';

export default function InfoPage() {
  return (
    <div className={styles.container}>
      <h1>INFO: 開催情報</h1>
      <div className={styles.table}>
        <div className={`${styles.title} ${styles.tr} ${styles.infoBox}`}>
          <h2>基本情報</h2>
        </div>
        <div className={styles.tr}></div>
        <div className={styles.tr}></div>
        <div className={`${styles.tr} ${styles.infoBox}`}>
          <div className={`${styles.th} ${styles.bold}`}>開催日時</div>
          <div className={styles.th}>11/3(月)・9:00〜15:30</div>
        </div>
        <div className={`${styles.tr} ${styles.infoBox}`}>
          <div className={`${styles.th} ${styles.bold}`}>持ち物</div>
          <div className={styles.th}>上履き/スリッパが必要です</div>
        </div>
        <div className={`${styles.tr} ${styles.infoBox}`}>
          <div className={`${styles.th} ${styles.bold}`}>開催場所</div>
          <div className={styles.th}>
            〒543-0061 大阪星光学院中学校・高等学校
          </div>
        </div>
      </div>
      <Access />
      <div className={styles.attention}>
        <h1>注意</h1>
        <h3>【金券の取り扱いについて】</h3>
        <ul>
          <li>払い戻しは一切できません、ご了承ください。</li>
          <li>金券は1シート50円券✕4枚で販売しております。</li>
          <li>
            一度の購入で400円または1000円分のみの販売になります。ご了承ください。
          </li>
          <li>
            金券はキャンパスプラザと1階保健室前で販売しております。
            <br />
            詳しくは地図をご覧ください。
          </li>
          <li>
            企画での支払いは原則金券のみとなっておりますが、高校棟１階の売店と食堂では現金のみご利用になれます。
          </li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【お手洗いについて】</h3>
        <ul>
          <li>
            男性用トイレは1階図書館横・2階・4階・5階、グラウンドテント（食品テント）の裏側にあります。
          </li>
          <li>女性用トイレは1階・3階・5階にあります。</li>
          <li>障がい者用トイレは高校棟1階にあります。</li>
          <li>詳しくは地図をご覧ください。</li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【AED について】</h3>
        <ul>
          <li>
            正門付近守衛室・中学棟1階 保健室前廊下
            ・3階職員室前渡り廊下・中学棟4階物理実験室前
            5階講堂（第1体育館）前廊下に設置しております。
          </li>
          <li>詳しくは地図をご覧ください。</li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【講堂について】</h3>
        <ul>
          <li>映像・演劇の演目中は入場できません。</li>
          <li>各演目終了後に係の者が誘導いたします。</li>
          <li>入場の際は入場扉、退場の際は退場扉をお使いください。</li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【飲食について】</h3>
        <ul>
          <li>食品は売り切れ次第終了となります。</li>
          <li>校内生の食品の購入は10:00からとなります。</li>
          <li>グラウンドで購入した食品は校舎内に持ち込み禁止です。</li>
          <li>校内企画の食品で受け取った食品は、原則持ち帰りください。</li>
          <li>休憩所として、グラウンド中央のテントをご利用下さい。</li>
          <li>食堂の休憩所としての利用はご遠慮下さい。</li>
          <li>グラウンド中央のテントはゲスト優先です。</li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【食堂の利用について】</h3>
        <ul>
          <li>食堂は原則校内生の利用は禁止です。</li>
          <li>食堂への食品の持ち込みはご遠慮ください。</li>
          <li>混雑が予想されますので30分以内のご利用をお願いします。</li>
          <li>金券は使用できません。現金のみ使用可能となります。</li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h3>【その他注意点】</h3>
        <ul>
          <li>自動販売機はご利用できません。ご了承ください。</li>
          <li>
            貴重品は必ず各自でご携帯ください。万一紛失された場合は責任を負いかねます。
          </li>
          <li>
            校内でお困りごとがございましたら、2階インフォメーションセンター
            （生徒協議会室） までお越しください。
            <br />
            また、その他ご不明な点等ありましたら、----を着たSF運営委員までお気兼ねなくお尋ねください。
          </li>
        </ul>
      </div>
    </div>
  );
}
