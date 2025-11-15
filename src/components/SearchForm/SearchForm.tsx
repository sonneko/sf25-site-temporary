'use client';

import styles from './SearchForm.module.scss';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import SearchResult from '../SearchResult/SearchResult';
import type { BoothTag } from '../../types/booth';
import { type Booth } from '../../types/booth';

import search from '../../lib/search';
import TagSlecter from '../TagSelecter/TagSelecter';

export default function SearchForm() {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Booth[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<BoothTag[]>([]);

  const searchHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setSearchResult(null);
    search(searchInputValue, selectedTags).then(result => {
      setSearchResult(result);
    });
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.search_box}>
          <button className={styles.search_icon} onClick={searchHandler}>
            <img src='/icon/search.svg' alt='search icon' />
          </button>
          <input
            className={styles.search_input}
            type='text'
            onChange={event => {
              setSearchInputValue(event.target.value);
            }}
            value={searchInputValue}
          />
        </div>
        <TagSlecter value={selectedTags} onChange={setSelectedTags} />
      </div>
      {searchResult === null ? null : (
        <>
          <div>
            <SearchResult data={searchResult} />
          </div>
        </>
      )}
    </>
  );
}
