'use client';
import type { Booth, BoothTag } from '../types/booth';
import { type SearchIndex, searchIndexSchema } from '../types/searchIndex';
import TinySegmenter from 'tiny-segmenter';
import { getBooths } from './clientBoothFetch';

let searchIndex: SearchIndex | null = null;
const tinySegmenter = new TinySegmenter();

// --- 既存の levenshteinDistance, similarity 関数は変更なし ---

function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;

  // DPテーブルを作成
  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  // 初期化
  // @ts-expect-error エラハンドリングだるい
  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  // @ts-expect-error エラハンドリングだるい
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  // DPテーブルを埋める
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // @ts-expect-error エラハンドリングだるい
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // @ts-expect-error エラハンドリングだるい
        dp[i][j] = Math.min(
          // @ts-expect-error エラハンドリングだるい
          dp[i - 1][j] + 1, // 削除
          // @ts-expect-error エラハンドリングだるい
          dp[i][j - 1] + 1, // 挿入
          // @ts-expect-error エラハンドリングだるい
          dp[i - 1][j - 1] + 1 // 置換
        );
      }
    }
  }

  // 最終的な編集距離を返す
  // @ts-expect-error エラハンドリングだるい
  return dp[len1][len2];
}

function similarity(str1: string, str2: string) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);

  // 最大長が0の場合は100%（両方とも空文字列の場合）
  if (maxLength === 0) return 100;

  // 類似度計算
  const similarityScore = (1 - distance / maxLength) * 100;
  return similarityScore;
}

async function getSearchIndex(): Promise<SearchIndex> {
  if (searchIndex !== null) return searchIndex;
  const json = (await fetch('/search-index.json').then(res =>
    res.json()
  )) as unknown;

  try {
    searchIndex = searchIndexSchema.parse(json);
    return searchIndex;
  } catch (err) {
    alert('何らかのエラーで検索に失敗しました。');
    throw new Error(err + '\n\n' + 'failed to ');
  }
}

function segment(input: string): string[] {
  return tinySegmenter.segment(input);
}

export default async function useSearch(
  keyword: string,
  selectedTags: BoothTag[]
): Promise<Booth[]> {
  const searchIndex = await getSearchIndex();
  const segmentedKeywords = segment(keyword);

  if (segmentedKeywords.length === 0) {
    return (await getBooths()).filter(booth => {
      const hasTagsBooths = selectedTags.map(selectedTag =>
        booth.tags.includes(selectedTag)
      );
      if (hasTagsBooths.length === 0) return true;
      return hasTagsBooths.reduce((a, b) => a || b);
    });
  }

  // 各ブースのスコアを保持する配列。インデックスの順序に対応。
  const boothScores: number[] = Array(searchIndex.length).fill(0);

  segmentedKeywords.forEach(searchWord => {
    if (searchWord.length < 2) return;

    searchIndex.forEach((target, index) => {
      let maxScoreForWord = 0;

      target.tokens.forEach(indexToken => {
        // 1. 🥇 完全一致 (Exact Match): 最高のスコア
        if (indexToken === searchWord) {
          maxScoreForWord = Math.max(maxScoreForWord, 1000);
          return; // 最も高いスコアなので、これ以上チェックする必要はない
        }

        // 2. 🥈 部分一致 (Containment): 高いスコア
        // 検索語がインデックス語に含まれている場合（例: 検索「化学」, インデックス「化学部」）
        if (indexToken.includes(searchWord)) {
          maxScoreForWord = Math.max(maxScoreForWord, 800);
        }

        // 3. 🥉 レーベンシュタイン類似度 (Fuzzy Match / タイポ対策): 中程度のスコア
        const simScore = similarity(indexToken, searchWord);
        if (simScore >= 60) {
          maxScoreForWord = Math.max(maxScoreForWord, Math.floor(simScore * 3));
        }
      });

      // 🚨 スコアを加算: 複数の検索キーワードがある場合、それぞれの最高スコアをブース全体に加算する
      // @ts-expect-error エラーハンドリングめんどい
      boothScores[index] += maxScoreForWord;
    });
  });

  // 💡 1. スコアに基づいてブースIDをソート
  const idList = boothScores
    .map((score, index) => {
      // @ts-expect-error エラーハンドリングだるい
      const boothId = searchIndex[index].booth_id;
      return { id: boothId, score };
    })
    .filter(booth => booth.score > 0) // スコアが0のブースは検索結果から除外
    .sort((a, b) => b.score - a.score) // スコアが大きい順にソート
    .map(booth => booth.id);

  // 💡 2. ブースデータを一度だけ取得
  const allBooths = await getBooths();

  // 💡 3. ソートされた idList の順序でブースデータを取り出して返す
  const sortedBooths = idList
    .map(id => allBooths.find(booth => booth.booth_id === id))
    .filter((booth): booth is Booth => booth !== undefined);

  return sortedBooths.filter(booth => {
    const hasTagBooths = selectedTags.map(selectedTag =>
      booth.tags.includes(selectedTag)
    );
    if (hasTagBooths.length === 0) return true;
    return hasTagBooths.reduce((a, b) => a && b);
  });
}
