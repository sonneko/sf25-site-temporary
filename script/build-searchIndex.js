/**
 * prompt:
 * 以下の長いJSONには{booth_id: string, tokens: string[]}[]の形式で検索用のインデックスが保存されている。
 * ただこれだとトークンの数が少なく精度がイマイチなので、それぞれのtokens配列に確実に関連していそうな別のトークン（2文字以上のものを10個以上）を追加して検索の精度を上げてほしい。
 * 既にある重要だと思うトークンについては、漢字表記やカタカナ表記やひらがな表記など表記揺れについてもトークンを追加して。
 * 検索インデックスのサイズと検索の精度を両立して欲しい。
 * これは星光学院という中高一貫の文化祭の企画についてのデータのため、「星光」「企画」「高校生」などの普遍的なトークンではなく、それぞれの企画を区別できるようなトークンを追加してほしい。
 */

const { readFileSync, writeFileSync } = require('fs');
const TinySegmenter = require('tiny-segmenter');

const tinySegmenter = new TinySegmenter();

function segmentString(str) {
  // 文字列をトークン化
  return tinySegmenter.segment(str);
}

// 🚨 強化されたノイズワード（ストップワード）のリストを定義
// 頻出するが検索意図を持たない単語をさらに追加・調整
const NOISE_TOKENS = [
  // 前回からの追加・調整
  'undefined',
  'の',
  'が',
  'を',
  'に',
  'へ',
  'と',
  'で',
  'から',
  'より',
  'や',
  'する',
  'いる',
  'ある',
  'ない',
  'できる',
  'られる',
  'なっ',
  'な',
  'だ',
  'ます',
  'です',
  'ますし',
  'まし',
  'いる',
  'れる',
  'た',
  'て',
  'よ',
  'ね',
  'ぞ',
  'さあ',
  'この',
  'その',
  'あの',
  'どの',
  'こと',
  'もの',
  'とき',
  'そう',
  'ため',
  'など',
  'これ',
  'それ',
  'あれ',
  'どれ',
  'ほか',
  'よう',
  'どう',
  'いう',
  'これら',
  'そこ',
  'ここ',
  'どこ',
  'そこ',
  'うち',
  'さん',
  'たち',
  'みな',
  'ー',
  '。',

  // 記号類や改行コード、短い接続詞
  '\n',
  '\r',
  ':',
  '・',
  '、',
  '。',
  ',',
  '.',
  '(',
  ')',
  '[',
  ']',
  '!',
  '?',
].map(t => t.toLowerCase());

function isNoise(token) {
  // トークン長が1以下のもの、またはノイズリストに含まれるものを判定
  if (token.length <= 1) return true;
  // 💡 補足: 完全に数字のみ、またはアルファベット1文字のみもノイズとみなす
  if (token.match(/^[0-9]+$/) && token.length > 0) return true;
  if (token.length === 1 && token.match(/[a-z]/i)) return true;

  return NOISE_TOKENS.includes(token.toLowerCase());
}

const ids = readFileSync(process.cwd() + '/assets/booths/allIds.txt')
  .toString()
  .split('\n')
  .filter(id => id.trim() !== '');

const booths = ids
  .map(id => {
    try {
      return JSON.parse(
        readFileSync(
          process.cwd() + '/assets/booths/' + id + '.json'
        ).toString()
      );
    } catch (e) {
      console.error(`Error parsing JSON for booth ID: ${id}`, e);
      return null;
    }
  })
  .filter(booth => booth !== null);

const ret = booths.map(booth => {
  // 💡 1. ブース名やIDは非常に重要なので、説明文とは分けて、そのままの形でトークン化
  const boothName = booth.booth_name || '';
  const description =
    (booth.short_description || '') + ' ' + (booth.long_description || '');

  // 💡 2. ブース名トークンと説明文トークンの生成
  // ブース名はそのまま一つの重要なトークンとして扱う（TinySegmenterの分割を回避）
  const nameAsToken = boothName.trim() ? [boothName.trim()] : [];

  // 説明文を分割
  const descTokens = segmentString(description);

  const twoWordsTokens = descTokens.map((item, index) => {
    if (isNoise(item)) return '';
    if (isNoise(descTokens[index + 1] ?? '')) return '';
    return item + (descTokens[index + 1] ?? '');
  });

  const threeWordsTokens = descTokens.map((item, index) => {
    if (isNoise(item)) return '';
    if (isNoise(descTokens[index + 1] ?? '')) return '';
    if (isNoise(descTokens[index + 2] ?? '')) return '';
    return item + (descTokens[index + 1] ?? '') + (descTokens[index + 2] ?? '');
  });

  // 💡 3. トークンを結合し、ノイズ除去と大文字小文字の統一
  const allTokens = [
    ...nameAsToken, // ブース名を「化学部」のように一つのトークンとしてそのまま保持
    ...descTokens,
    ...twoWordsTokens,
    ...threeWordsTokens,
  ]
    .filter(token => !isNoise(token))
    .map(token => token.toLowerCase());

  // 💡 4. 重複を排除
  const uniqueTokens = [...new Set(allTokens)];

  return {
    booth_id: booth.booth_id,
    // 💡 5. 並び替え: ブース名に完全一致するトークンを先頭に、次にブースID、その他
    tokens: uniqueTokens.sort((a, b) => {
      // 1. ブース名（toLowerCase）と一致するトークンを最優先
      if (a === boothName.toLowerCase() && b !== boothName.toLowerCase())
        return -1;
      if (a !== boothName.toLowerCase() && b === boothName.toLowerCase())
        return 1;

      // 2. ブースID（例: class-m3a）と一致するトークンを次に優先
      if (
        a === booth.booth_id.toLowerCase() &&
        b !== booth.booth_id.toLowerCase()
      )
        return -1;
      if (
        a !== booth.booth_id.toLowerCase() &&
        b === booth.booth_id.toLowerCase()
      )
        return 1;

      return 0;
    }),
  };
});

const json = JSON.stringify(ret);

console.log('generated SearchIndex');
console.log('length: ' + json.length);
console.log('saving into `/public/search-index.json`');
writeFileSync(process.cwd() + '/public/search-index.json', json);
console.log('saved');
