import { useCallback } from 'react';
import { type BoothTag, BOOTH_TAGS } from '../../types/booth';
import { convertBoothTagInfo } from '../../lib/BoothUtility';
import styles from './TagSlecter.module.scss';
import CheckIcon from './CheckMark';

export default function TagSlecter({
  value,
  onChange,
}: {
  value: BoothTag[];
  onChange: (newTag: BoothTag[]) => void;
}) {
  const handleTagToggle = useCallback(
    (tag: BoothTag) => {
      // 既に選択されているかチェック
      const isSelected = value.includes(tag);

      if (isSelected) {
        onChange(value.filter(t => t !== tag));
      } else {
        onChange([...value, tag]);
      }
    },
    [value, onChange]
  );

  return (
    <div className={styles.container}>
      <label
        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
      >
        {''}
      </label>
      <div className={styles.buttons}>
        {BOOTH_TAGS.map(tag => {
          const isSelected = value.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              style={{
                border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: isSelected ? '#e9f5ff' : '#f8f8f8',
                color: isSelected ? '#007bff' : '#333',
              }}
              className={styles.button}
            >
              {convertBoothTagInfo(tag)}
              {/* ✅ の代わりにSVGコンポーネントを条件付きでレンダリング */}
              {isSelected ? <CheckIcon /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
