import styles from './SearchResult.module.scss';
import type { Booth } from '../../types/booth';
import BoothCard from '../BoothCard/BoothCard';

export default function SearchResult({ data }: { data: Booth[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.search_result}>
        {data.length === 0 ? (
          <>
            検索結果：見つかりませんでした。キーワードを変えてもう一度お試しください。
          </>
        ) : (
          <>検索結果：{data.length}件見つかりました。</>
        )}
        {data.map((each, index) => (
          <BoothCard data={each} key={index}></BoothCard>
        ))}
      </div>
    </div>
  );
}
