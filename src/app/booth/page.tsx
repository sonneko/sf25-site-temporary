import BoothCard from '../../components/BoothCard/BoothCard';
import { getAllBooths } from '../../lib/BoothsProvider';
import styles from './page.module.scss';

export default async function BoothPage() {
  const booths = await getAllBooths();
  return (
    <>
      <h1 className={styles.title}>企画一覧</h1>
      <div className={styles.container}>
        <div className={styles.contents}>
          {booths.map((booth, index) => (
            <div key={index} className={styles.spacer}>
              <a id={booth.booth_id} />
              <BoothCard key={index} data={booth} />
            </div>
          ))}
        </div>
        <div className={styles.list}>
          {booths.map(booth => (
            <div key={booth.booth_id}>
              <a href={`#${booth.booth_id}`}>{booth.booth_name}</a>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
